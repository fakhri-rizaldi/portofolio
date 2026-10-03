import { z } from "zod";

/**
 * lib/validators.ts
 * Skema validasi formulir kontak sesuai CF-01 s/d CF-05 & design.md §4.2
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nama lengkap minimal 2 karakter")
    .max(60, "Nama lengkap maksimal 60 karakter"),
  email: z
    .string()
    .min(1, "Alamat email wajib diisi")
    .email("Format email tidak valid (contoh: nama@domain.com)"),
  subject: z
    .string()
    .min(3, "Subjek minimal 3 karakter")
    .max(100, "Subjek maksimal 100 karakter")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter agar maksud tersampaikan")
    .max(1500, "Pesan maksimal 1500 karakter"),
  // CF-05: Honeypot field (anti-spam bot) — harus selalu kosong
  _gotcha: z.string().max(0, "Aktivitas spam terdeteksi").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;
