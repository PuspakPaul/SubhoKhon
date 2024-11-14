import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Aboutus from "../pages/Aboutus/Aboutus";
import Events from "../pages/Events/Events";
import Packages from "../pages/Packages/Packages";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleEvents from "../pages/Events/SingleEvents";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserCP from "../pages/Dashboard/User/UserCP";
import Booking from "../pages/Dashboard/User/Booking/Booking";
import Selects from "../pages/Dashboard/User/Selects";
import PaymentHistory from "../pages/Dashboard/User/Payment/History/PaymentHistory";
import Payment from "../pages/Dashboard/User/Payment/Payment";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageEvents from "../pages/Dashboard/Admin/ManageEvents";
import ManagePackages from "../pages/Dashboard/Admin/ManagePackages";
import AddEvents from "../pages/Dashboard/Admin/AddEvents";
import AddPackages from "../pages/Dashboard/Admin/AddPackages";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "aboutus",
          element: <Aboutus/>
        },
        {
          path: "events",
          element: <Events/>
        },
        {
          path: "packages",
          element: <Packages/>
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "register",
          element: <Register/>
        },
        {
          path: "/events/:id",
          element: <SingleEvents/>,
          loader: ({params}) => fetch(`http://localhost:5000/event/${params.id}`)
        }
      ]
    },

    {
      path: "/dashboard",
      element: <DashboardLayout/>,
      children: [
        {
          index: true,
          element: <Dashboard/>
        },
        {
          path: "user-cp",
          element: <UserCP/>
        },
        {
          path: "booked-events",
          element: <Booking/>
        },
        {
          path: "my-selected",
          element: <Selects/>
        },
        {
          path: "my-payments",
          element: <PaymentHistory/>
        },
        {
          path: "user/payment",
          element: <Payment/>
        },
        {
          path: "admin-home",
          element: <AdminHome/>
        },
        {
          path: "manage-events",
          element: <ManageEvents/>
        },
        {
          path: "manage-packages",
          element: <ManagePackages/>
        },
        {
          path: "add-events",
          element: <AddEvents/>
        },
        {
          path: "add-packages",
          element: <AddPackages/>
        },
        {
          path: "manage-users",
          element: <ManageUsers/>
        }
      ]
    }
  ]);