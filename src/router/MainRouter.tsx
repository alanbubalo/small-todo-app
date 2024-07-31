import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
            { path: "/", element: <TodoListScreen /> },
            { path: "/create", element: <CreateTodoScreen /> },
            { path: "/:todoId", element: <EditTodoScreen /> },
            { path: "*", element: <PageNotFound /> },
          ],
        },
      ])}
    />
  );
};
