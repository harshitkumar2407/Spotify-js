import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../../features/auth/ui/pages/Login";
import Register from "../../features/auth/ui/pages/Register";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../../features/home/ui/pages/HomePage";
import SongList from "../../features/home/ui/pages/SongList";
import PublicRoute from "./PublicRoute";
import ProtectedRoutes from "./ProtectedRoutes";
import { useDispatch } from "react-redux";
import { hydrateUserAction } from "../../features/auth/state/authAction";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    if (localStorage.getItem("accessToken")) {
      dispatch(hydrateUserAction());
    }
  },[dispatch])
  
  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <Login />,
            },
            {
              path:"login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        }
      ]
    },

    {
      path: "/main",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: "songs/:name",
              element: <SongList />,
            },
          ],
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
