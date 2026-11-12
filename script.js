const STORAGE_KEY = "campus_register_students";
const form = document.querySelector("#registrationForm");
const body = document.querySelector("#recordsBody");
const empty = document.querySelector("#emptyState");
const search = document.querySelector("#searchInput");
const message = document.querySelector("#message");

function getRecords() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } }
function saveRecords(records) { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function clean(value) { return value.trim().replace(/[<>]/g, ""); }
function showMessage(text, type = "success") { message.textContent = text; message.className = `message ${type}`; setTimeout(() => { message.className = ""; message.textContent = ""; }, 3500); }
function escapeHtml(value) { const el = document.createElement("div"); el.textContent = value; return el.innerHTML; }

function render(query = "") {
  const records = getRecords(); const term = query.toLowerCase();
  const visible = records.filter(r => [r.name, r.email, r.phone, r.course].some(v => v.toLowerCase().includes(term)));
  document.querySelector("#totalTop").textContent = records.length; document.querySelector("#totalBadge").textContent = records.length;
  body.innerHTML = visible.map(r => `<tr><td><strong>${escapeHtml(r.name)}</strong><small>${escapeHtml(r.dob)}</small></td><td>${escapeHtml(r.email)}<small>${escapeHtml(r.phone)}</small></td><td><span class="course">${escapeHtml(r.course)}</span></td><td>${escapeHtml(r.gender)}</td><td>${escapeHtml(r.created)}</td><td><button class="delete" data-id="${r.id}" aria-label="Delete ${escapeHtml(r.name)}">×</button></td></tr>`).join("");
  empty.hidden = visible.length > 0; document.querySelector("table").hidden = visible.length === 0;
}

form.addEventListener("submit", event => {
  event.preventDefault(); if (!form.checkValidity()) return form.reportValidity();
  const value = id => document.querySelector(`#${id}`).value;
  const record = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), name: clean(value("fullName")), email: clean(value("email")).toLowerCase(), phone: clean(value("phone")), dob: value("dob"), course: value("course"), gender: value("gender"), created: new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }) };
  const records = getRecords(); if (records.some(item => item.email === record.email)) return showMessage("This email address is already registered.", "error");
  records.unshift(record); saveRecords(records); form.reset(); render(search.value); showMessage("Registration saved successfully."); document.querySelector("#records").scrollIntoView({ behavior:"smooth" });
});
body.addEventListener("click", event => { const button = event.target.closest(".delete"); if (!button || !confirm("Delete this registration?")) return; saveRecords(getRecords().filter(item => item.id !== button.dataset.id)); render(search.value); showMessage("Registration deleted."); });
search.addEventListener("input", () => render(search.value)); render();
