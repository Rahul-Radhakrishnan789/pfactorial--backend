import { z } from 'zod';

export const voucherSchema = z.object({
  name: z.string().min(1),
  description: z.string().max(2000),
  code: z.string().optional(),
  currency: z.enum(['USD', 'EUR', 'GBP']),
});
