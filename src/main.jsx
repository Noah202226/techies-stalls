import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import StallDetails from "./pages/StallDetails.jsx";
import Landing from "./pages/Landing.jsx";

const queryClient = new QueryClient({});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/stalls",
    element: <Home />,
  },
  {
    path: "/stalls/:id",
    element: <StallDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
