import type { Dayjs } from "dayjs";

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
  createTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id?: string) => void;
}
