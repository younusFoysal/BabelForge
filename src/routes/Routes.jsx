import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
import Home from "../Pages/Home.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Login from "../Pages/Login.jsx";
import SignUp from "../Pages/SignUp.jsx";
import Statistics from "../Pages/Dashboard/Common/Statistics.jsx";
import Profile from "../Pages/Dashboard/Common/Profile.jsx";
import Contactus from "../Pages/Contactus.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact-us",
        element: <Contactus />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
