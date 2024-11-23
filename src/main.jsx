import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/SignupPageg.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import isAuthenTicated from "./HOC/isAuthenticated.jsx";

const PrivateRoute = isAuthenTicated(App);

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
