import { z } from "zod";
import { TodoState } from "../enums/todoState";

export const TodoSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(256, { message: "Must be 256 or fewer characters long" }),
  state: z.nativeEnum(TodoState, {
    message: "Must be either 'pending', 'in progress' or 'done'",
  }),
  created_by: z
    .string()
    .min(1, { message: "Created by is required" })
    .max(256, { message: "Must be 256 or fewer characters long" }),
  assigned_to: z
    .string()
    .min(1, { message: "Assigned to is required" })
    .max(256, { message: "Must be 256 or fewer characters long" }),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;
