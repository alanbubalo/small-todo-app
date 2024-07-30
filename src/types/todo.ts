import type { Dayjs } from "dayjs";
import type { TodoSchemaType } from "../schemas/TodoSchema";

export type State = "pending" | "in_progress" | "done";

export interface Todo {
  id: string;
  state: State;
  description: string;
  created_at: Dayjs;
}

export interface TodoListState {
  todoList: Todo[];
  getTodoById: (id?: string) => Todo | undefined;
  createTodo: (todo: TodoSchemaType) => void;
  updateTodo: (todo: TodoSchemaType, id?: string) => void;
  deleteTodo: (id?: string) => void;
}
