import {z} from "zod";

export const signUpSchema = z.object({
    firstName: z.string()
      .transform(firstName => firstName.trim())
      .refine(firstName => firstName.length >= 2, {
        message: "First Name must have at least 2 characters after removing spaces",
    })
      .refine(firstName => /^[a-zA-Z\s]*$/.test(firstName), {
        message: "First Name must not contain numbers",
      }),
  
    lastName: z.string()
      .transform(lastName => lastName.trim())
      .refine(lastName => lastName.length >= 2, {
        message: "Last Name must have at least 2 characters after removing spaces",
      })
      .refine(lastName => /^[a-zA-Z\s]*$/.test(lastName), {
        message: "Last Name must not contain numbers",
      }),
  
    email: z.string().email("Invalid email address"),
  
    password: z.string()
      .min(8, "Password must have at least 8 characters")
      .refine(password => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password), {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
  
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });