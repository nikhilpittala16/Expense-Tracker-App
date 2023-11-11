import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage, { action as loginAction } from "./Pages/loginPage";
import ExpensesPage from "./Pages/expensesPage";
import HomePage from "./Pages/home&signup";
import { action as signupAction } from "./Pages/home&signup";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage></HomePage>,
      action: signupAction,
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
      action: loginAction,
    },
    {
      path: "/expenses",
      element: <ExpensesPage></ExpensesPage>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
