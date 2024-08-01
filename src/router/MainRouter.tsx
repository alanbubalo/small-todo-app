import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { TodoListScreen } from "../screens/list-screens/TodoListScreen";
import { CreateTodoScreen } from "../screens/create-edit-screens/CreateTodoScreen";
import { MainLayout } from "../screens/MainLayout";
import { EditTodoScreen } from "../screens/create-edit-screens/EditTodoScreen";
import { PageNotFound } from "../screens/PageNotFound.tsx";

export const MainRouter = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <MainLayout />,
          children: [
            {
              index: true,
              loader: async () => redirect("/todo/list"),
            },
            { path: "/todo", loader: async () => redirect("/todo/list") },
            { path: "/todo/list", element: <TodoListScreen /> },
            { path: "/todo/create", element: <CreateTodoScreen /> },
            { path: "/todo/edit/:todoId", element: <EditTodoScreen /> },
          ],
        },
        { path: "*", element: <PageNotFound /> },
      ])}
    />
  );
};
