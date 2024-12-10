import { z } from "zod"

const categories = [
    'Housing',
    'Household Items',
    'Utilities',
    'Groceries',
    'Dining Out',
    'Transportation', 
    'Education',
    'Wellness & Fitness',
    'Beauty & Grooming',
    'Savings & Investments', 
    'Insurance & Protection',
    'Entertainment & Leisure', 
    'Travel & Vacation',
    'Clothing & Accessories',
    'Technology',
    'Gifts & Donations',
] as const

// Validates dates, ensuring they're not in the future (with 5-min buffer)
const dateSchema = z.date({required_error: "Date is required", invalid_type_error: "Invalid date format"})
   .refine(
       (date) => {
           const now = new Date();
           const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
           return date <= new Date(now.getTime() + bufferTime);
       },
       { message: "Date cannot be set in the future" }
   );

// Client-side profile validation schema
export const editProfileSchemaClient = z.object({
    username: z.string()
        .min(1, "Username cannot be empty")
        .max(15, "Username cannot exceed 15 characters")
        .refine(
            (value) => value.replace(/\s/g, '').length >= 3,
            "Username must contain at least 3 non-space characters"
        ),
    email: z.string().email(),
    currency: z.string().length(3)
  })
  
  // Server-side profile validation with additional UUID check
  export const editProfileSchemaServer = z.object({
    id: z.string().uuid(),
    username: z.string()
        .min(1, "Username cannot be empty")
        .max(15, "Username cannot exceed 15 characters")  
        .refine(
            (value) => value.replace(/\s/g, '').length >= 3,
            "Username must contain at least 3 non-space characters"
        ),
    currency: z.enum(['USD', 'EUR', 'JPY', 'GBP', 'CNY', 'CAD', 'AUD', 'CHF', 'HKD', 'MXN', 'BRL', 'RUB', 'INR', 'ZAR', 'PKR', 'SGD', 'SAR', 'AED'])
  })

// Client-side expense validation with string amount
export const newExpenseSchemaClient = z.object({
   description: z.string()
       .min(1, "Description is required")
       .max(25, "Description must be 25 characters or less"),
   amount: z.string()
       .min(1, "Amount is required")
       .refine((val) => {
           const num = parseFloat(val);
           return num > 0 && num <= 999999;
       }, {
           message: "Amount must be greater than 0 and not exceed 999,999",
       }),
   date: dateSchema,
   category: z.string()
})

// Server-side expense validation with numeric amount and UUID
export const newExpenseSchemaServer = z.object({
   id: z.string().uuid(),
   description: z.string()
       .min(1, "Description is required")
       .max(25, "Description must be 25 characters or less"),
   amount: z.number({
           required_error: "Amount is required",
           invalid_type_error: "Amount must be a number",
       })
       .positive("Amount must be greater than 0")
       .max(999999, "Amount must not exceed 999,999")
       .finite("Amount must be finite")
       .safe("Amount must be finite"),
   date: dateSchema,
   category: z.enum(categories)
})