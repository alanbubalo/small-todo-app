import { z } from "zod";

export const TodoSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(256, { message: "Must be 256 or fewer characters long" }),
  state: z.enum(["pending", "in_progress", "done"], {
    message: "Must be either 'pending', 'in progress' or 'done'",
  }),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;
