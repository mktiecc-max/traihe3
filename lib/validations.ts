import { z } from 'zod'

export const leadSchema = z.object({
  childName: z.string().min(2, 'Tên con phải có ít nhất 2 ký tự').max(100),
  phone: z
    .string()
    .regex(/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ')
    .transform((v) => v.replace(/\s+/g, '')),
  birthYear: z.coerce
    .number()
    .int()
    .min(2005)
    .max(2022),
  session: z.enum(['Kỳ 1 - Tháng 6', 'Kỳ 2 - Tháng 7', 'Cả 2 kỳ']),
  address: z.string().max(200).optional().default(''),
  notes: z.string().max(500).optional().default(''),
  // Honeypot — must be empty
  website: z.string().max(0).optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
