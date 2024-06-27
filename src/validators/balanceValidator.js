import { z } from "zod";

export const updateBalanceSchema = z.object({
  userId: z.number().int().positive(),
  amount: z.number().finite(),
});

export const validateUpdateBalance = (data) => {
  try {
    return updateBalanceSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      throw new Error(JSON.stringify(errors));
    }
    throw error;
  }
};
