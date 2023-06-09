import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext();
    console.log(token);

    if (!token) {
        return <Navigate to={"/admin/login"} />;
    }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post("/logout").then(() => {
            setToken(null);
            setUser(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/contacts">Contacts</Link>
                <Link to="/admin/banners">Banners</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Established Jakarta</div>
                    <div>
                        {user.name}
                        <a className="btn-logout" href="#" onClick={onLogout}>
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
