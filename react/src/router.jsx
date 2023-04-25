import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Notfound from "./views/Notfound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";
import Contacts from "./views/Contacts";
import ContactForm from "./views/ContactForm";
import Banners from "./views/Banners";
import BannerForm from "./views/BannerForm";
import FrontLayout from "./components/FrontLayout";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <DefaultLayout />,
        children: [
            { path: "/admin", element: <Navigate to={"/admin/users"} /> },
            {
                path: "/admin/users",
                element: <Users />,
            },
            {
                path: "/admin/users/new",
                element: <UserForm key={"userCreate"} />,
            },
            {
                path: "/admin/users/:id",
                element: <UserForm key={"userUpdate"} />,
            },
            {
                path: "/admin/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/admin/contacts",
                element: <Contacts />,
            },
            {
                path: "/admin/contacts/new",
                element: <ContactForm key={"contactCreate"} />,
            },
            {
                path: "/admin/banners",
                element: <Banners />,
            },
            {
                path: "/admin/banners/new",
                element: <BannerForm key={"bannerCreate"} />,
            },
            {
                path: "/admin/banners/:id",
                element: <BannerForm key={"bannerUpdate"} />,
            },
        ],
    },
    {
        path: "/admin",
        element: <GuestLayout />,
        children: [
            {
                path: "/admin/login",
                element: <Login />,
            },
            {
                path: "/admin/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/",
        element: <FrontLayout />,
        // children: [
        //     {
        //         path: "/admin/login",
        //         element: <Login />,
        //     },
        //     {
        //         path: "/admin/signup",
        //         element: <Signup />,
        //     },
        // ],
    },
    {
        path: "*",
        element: <Notfound />,
    },
]);
export default router;
