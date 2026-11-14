import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(2, "Минимум 2 символа"),
    email: z.email("Введите корректный email"),
    password: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
