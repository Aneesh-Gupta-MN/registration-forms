"use client";

import { useMemo, useState } from "react";
import { BookOpen, CheckCircle2, Search, ShieldCheck, Trash2, UserPlus, Users } from "lucide-react";
import { createRegistration, deleteRegistration } from "./actions";

type StudentRecord = { id: string; fullName: string; email: string; phone: string; course: string; gender: string; dateOfBirth: string; createdAt: Date };
const notices: globalThis.Record<string, { tone: string; text: string }> = {
  success: { tone: "success", text: "Registration saved successfully." }, deleted: { tone: "neutral", text: "Registration removed." },
  duplicate: { tone: "error", text: "That email address is already registered." }, invalid: { tone: "error", text: "Please check the form and enter valid details." },
  error: { tone: "error", text: "Something went wrong. Please try again." },
};

export function RegistrationDashboard({ initialRecords, status }: { initialRecords: StudentRecord[]; status?: string }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => { const value = query.toLowerCase(); return initialRecords.filter((item) => [item.fullName, item.email, item.phone, item.course].some((field) => field.toLowerCase().includes(value))); }, [initialRecords, query]);
  const notice = status ? notices[status] : undefined;
  return <main>
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><BookOpen size={20} /></span><span>Campus<span>Register</span></span></a><nav><a href="#register">Register</a><a href="#records">Records</a></nav></header>
    <section className="hero" id="top"><div className="eyebrow"><span /> WEB TECHNOLOGY LAB PROJECT</div><h1>Student registration,<br /><em>made refreshingly simple.</em></h1><p>A secure and reliable registration portal that captures student details and keeps every record organized in one place.</p><div className="hero-stats"><div><strong>{initialRecords.length}</strong><span>Total registrations</span></div><div><strong>100%</strong><span>Data validated</span></div><div><strong>24/7</strong><span>Always available</span></div></div></section>
    <section className="workspace" id="register"><div className="section-heading"><div><span className="kicker">01 — REGISTRATION</span><h2>Create a student profile</h2><p>Complete all fields below. The information is validated before it is stored.</p></div><div className="security-note"><ShieldCheck size={18} /><span><strong>Secure entry</strong>Your data is stored safely</span></div></div>
      {notice && <div className={`notice ${notice.tone}`} role="status"><CheckCircle2 size={17} />{notice.text}</div>}
      <form action={createRegistration} className="registration-form">
        <label><span>Full name</span><input name="fullName" placeholder="e.g. Ananya Sharma" minLength={2} maxLength={80} required /></label>
        <label><span>Email address</span><input name="email" type="email" placeholder="student@example.com" maxLength={120} required /></label>
        <label><span>Phone number</span><input name="phone" type="tel" placeholder="+91 98765 43210" pattern="[0-9+()\-\s]{7,18}" required /></label>
        <label><span>Date of birth</span><input name="dateOfBirth" type="date" required /></label>
        <label><span>Course</span><select name="course" defaultValue="" required><option value="" disabled>Select your course</option><option>B.Tech — Computer Science</option><option>B.Tech — Information Technology</option><option>BCA</option><option>MCA</option><option>B.Sc — Computer Science</option><option>Other</option></select></label>
        <label><span>Gender</span><select name="gender" defaultValue="" required><option value="" disabled>Select an option</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></label>
        <div className="form-footer"><p>By submitting, you confirm that the details provided are accurate.</p><button type="submit"><UserPlus size={18} /> Register student</button></div>
      </form>
    </section>
    <section className="records-section" id="records"><div className="section-heading"><div><span className="kicker">02 — DIRECTORY</span><h2>Registered students</h2><p>Search, review, and manage all saved registration records.</p></div><div className="record-count"><Users size={18} /> {initialRecords.length} {initialRecords.length === 1 ? "record" : "records"}</div></div>
      <div className="search"><Search size={18} /><input aria-label="Search registrations" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, email, phone, or course..." /><kbd>{filtered.length}</kbd></div>
      <div className="table-wrap">{filtered.length ? <table><thead><tr><th>Student</th><th>Contact</th><th>Course</th><th>Gender</th><th>Registered</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><strong>{item.fullName}</strong><small>{item.dateOfBirth}</small></td><td>{item.email}<small>{item.phone}</small></td><td><span className="course-pill">{item.course}</span></td><td>{item.gender}</td><td>{new Date(item.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td><td><form action={deleteRegistration}><input type="hidden" name="id" value={item.id} /><button className="delete" title="Delete registration" aria-label={`Delete ${item.fullName}`}><Trash2 size={16} /></button></form></td></tr>)}</tbody></table> : <div className="empty"><Users size={30} /><h3>{query ? "No matching students" : "No registrations yet"}</h3><p>{query ? "Try a different search term." : "Your first student record will appear here."}</p></div>}</div>
    </section>
    <footer><div className="brand"><span className="brand-mark"><BookOpen size={18} /></span><span>Campus<span>Register</span></span></div><p>Web Technology Lab Project · Built with Next.js and Cloudflare D1</p></footer>
  </main>;
}
