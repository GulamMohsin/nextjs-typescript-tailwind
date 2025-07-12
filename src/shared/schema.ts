import { pgTable, text, serial, date } from "drizzle-orm/pg-core";
import { z } from "zod";

// 1. Define the Drizzle table schema
export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  department: text("department").notNull(),
  title: text("title"),
  status: text("status").notNull().default("active"), // active, inactive, on-leave
  subjects: text("subjects"), // comma-separated subjects
  startDate: date("start_date"),
  notes: text("notes"),
  avatar: text("avatar").default(""), // URL to avatar image
});

// 2. Manually define Zod schemas to avoid Buffer issues
export const insertTeacherSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  department: z.string(),
  title: z.string().optional(),
  status: z.enum(["active", "inactive", "on-leave"]).optional(),
  subjects: z.string().optional(),
  startDate: z.string().optional(), // or z.date() if you parse it
  notes: z.string().optional(),
  avatar: z.string().optional(),
});

// 3. Schema for update (all fields optional)
export const updateTeacherSchema = insertTeacherSchema.partial();

// 4. Inferred TypeScript types
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;
export type UpdateTeacher = z.infer<typeof updateTeacherSchema>;
export type Teacher = typeof teachers.$inferSelect;
