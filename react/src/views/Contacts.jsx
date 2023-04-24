import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Contacts() {
    const [contact, setContact] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getContacts();
    }, []);

    const { setNotification } = useStateContext();

    const onDelete = (c) => {
        if (!window.confirm("Delete this Message?")) {
            return;
        }
        axiosClient.delete(`/contacts/${c.id}`).then(() => {
            setNotification(`Message of ${c.name} was deleted`);
            getContacts();
        });
    };
    const getContacts = () => {
        setLoading(true);
        axiosClient
            .get("/contacts")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setContact(data.data);
                setMeta(data.meta);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Contacts</h1>
                <Link to={"/contacts/new"} className="btn-add">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan={"5"} className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {contact.map((c) => (
                                <tr>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>
                                        {c.message.length > 40
                                            ? c.message.substring(0, 40) + "..."
                                            : c.message}
                                    </td>
                                    <td>{c.created_at}</td>
                                    <td>
                                        <button
                                            onClick={(e) => onDelete(c)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            ></div>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
