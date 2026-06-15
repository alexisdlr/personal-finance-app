import * as z from "zod";

export const UserSchemaLogin = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(3, { message: "Email must be at least 3 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Za-z]/, {
      message: "Password must contain at least one letter",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number",
    }),
});

export const UserSchemaSignUp = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(3, { message: "Email must be at least 3 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Za-z]/, { message: "Password must contain at least one letter" })
    .regex(/\d/, { message: "Password must contain at least one number" }),

  name: z.string().min(3, { message: "Name must be at least 3 characters" }),

  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" }),
});

export const CreateBudgetSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
  maximum: z
    .number()
    .min(0, { message: "Maximum spend must be a positive number" }),
  theme: z.string().min(1, { message: "Theme is required" }),
});

export const CreatePotSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  target: z.number().min(0, { message: "Target must be a positive number" }),
  theme: z.string().min(1, { message: "Theme is required" }),
});

export const PotMoneySchema = z.object({
  amount: z
    .number()
    .positive({ message: "Amount must be greater than 0" }),
});

export const CreateTransactionSchema = z.object({
  type: z.enum(["expense", "income"], {
    message: "Transaction type is required",
  }),
  name: z.string().min(1, { message: "Recipient / Sender is required" }),
  amount: z
    .number()
    .positive({ message: "Amount must be greater than 0" }),
  category: z.string().min(1, { message: "Category is required" }),
  date: z.string().min(1, { message: "Transaction date is required" }),
  recurring: z.boolean(),
});

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Za-z]/, {
    message: "Password must contain at least one letter",
  })
  .regex(/\d/, {
    message: "Password must contain at least one number",
  });

export const UpdateProfileSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(3, { message: "Email must be at least 3 characters" }),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
