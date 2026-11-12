"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { registrations } from "@/db/schema";

const text = (value: FormDataEntryValue | null) => String(value ?? "").trim();

export async function createRegistration(formData: FormData) {
  const fullName = text(formData.get("fullName"));
  const email = text(formData.get("email")).toLowerCase();
  const phone = text(formData.get("phone"));
  const course = text(formData.get("course"));
  const gender = text(formData.get("gender"));
  const dateOfBirth = text(formData.get("dateOfBirth"));
  if (fullName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[0-9+()\-\s]{7,18}$/.test(phone) || !course || !["Female", "Male", "Non-binary", "Prefer not to say"].includes(gender) || !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) redirect("/?status=invalid");
  try {
    await getDb().insert(registrations).values({ id: crypto.randomUUID(), fullName, email, phone, course, gender, dateOfBirth, createdAt: new Date() });
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    redirect(message.includes("unique") ? "/?status=duplicate" : "/?status=error");
  }
  redirect("/?status=success");
}

export async function deleteRegistration(formData: FormData) {
  const id = text(formData.get("id"));
  if (id) await getDb().delete(registrations).where(eq(registrations.id, id));
  redirect("/?status=deleted");
}
