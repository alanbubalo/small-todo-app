import dayjs from "dayjs";
import { create } from "zustand";
import { ulid } from "ulidx";
import type { Todo, TodoListState } from "../types/todo";

export const useTodoStore = create<TodoListState>()((set, get) => ({
  todoList: JSON.parse(localStorage.getItem("todoList") ?? "[]") as Todo[],
  getTodoById: (id) => {
    return get().todoList.find((item) => item.id === id);
  },
  createTodo: (todo) => {
    const newTodo: Todo = {
      id: ulid(),
      created_at: dayjs(),
      updated_at: dayjs(),
      ...todo,
    };

    set((state) => {
      const updatedTodoList = [...state.todoList, newTodo];
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return { todoList: updatedTodoList };
    });
  },
  updateTodo: (updatedTodo, id) => {
    // if (!id) {
    //   throw new Error("Cannot update todo without id");
    // }

    set((state) => {
      const updatedTodoList = state.todoList.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return { todoList: updatedTodoList };
    });
  },
  deleteTodo: (id) => {
    // if (!id) {
    //   throw new Error("Cannot delete todo without id");
    // }

    set((state) => {
      const updatedTodoList = state.todoList.filter((todo) => todo.id !== id);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return { todoList: updatedTodoList };
    });
  },
}));
