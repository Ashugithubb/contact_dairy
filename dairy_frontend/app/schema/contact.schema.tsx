import { z } from "zod";

export const createContactSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  nickName: z.string().min(1, { message: "Nickname is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumbers: z.array(z.string().min(5, { message: "Phone number can't be empty" })),
  tags: z.array(z.string()).min(1, { message: "Please add at least one tag" }),
  avtarUrl:z.string().optional()
});

export type CreateContactFormData = z.infer<typeof createContactSchema>;
