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

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <Navigate to={"/users"} /> },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserForm key={"userCreate"} />,
            },
            {
                path: "/users/:id",
                element: <UserForm key={"userUpdate"} />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/contacts",
                element: <Contacts />,
            },
            {
                path: "/contacts/new",
                element: <ContactForm key={"contactCreate"} />,
            },
            {
                path: "/banners",
                element: <Banners />,
            },
            {
                path: "/banners/new",
                element: <BannerForm key={"bannerCreate"} />,
            },
            {
                path: "/banners/:id",
                element: <BannerForm key={"bannerUpdate"} />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <Notfound />,
    },
]);
export default router;
