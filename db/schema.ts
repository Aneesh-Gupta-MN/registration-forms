import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const registrations = sqliteTable("registrations", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  course: text("course").notNull(),
  gender: text("gender").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
