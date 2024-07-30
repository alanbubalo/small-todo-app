import dayjs from "dayjs";
import { create } from "zustand";
import type { Todo, TodoListState } from "../types/todo";

export const useTodoStore = create<TodoListState>()((set, get) => ({
  todoList: JSON.parse(localStorage.getItem("todoList") ?? "[]") as Todo[],
  getTodoById: (id) => {
    return get().todoList.find((item) => item.id === id);
  },
  createTodo: (todo) => {
    const newTodo: Todo = {
      id: Math.random().toString(36).slice(2, 9),
      created_at: dayjs(),
      description: todo.description,
      state: "pending",
    };

    set((state) => {
      const updatedTodoList = [...state.todoList, newTodo];
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return { todoList: updatedTodoList };
    });

    return newTodo;
  },
  updateTodo: (updatedTodo, id) => {
    set((state) => {
      const updatedTodoList = id
        ? state.todoList.map((todo) =>
            todo.id === id ? { ...todo, updatedTodo } : todo
          )
        : state.todoList;
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return { todoList: updatedTodoList };
    });

    return updatedTodo;
  },
  deleteTodo: (id) => {
    set((state) => {
      const updatedTodoList = id
        ? state.todoList.filter((todo) => todo.id !== id)
        : state.todoList;
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return { todoList: updatedTodoList };
    });
  },
}));
