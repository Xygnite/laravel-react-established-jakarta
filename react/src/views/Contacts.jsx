import React, { useEffect, useState } from "react";
import axiosClient, { axiosFileClient } from "../axios-client";
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

    const getContactsAsExcel = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosFileClient
            .get("/contacts/export")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                // setContact(data.data);
                // setMeta(data.meta);
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "contacts.xlsx"); // nama file dan extension sesuaikan dengan file yang di download
                document.body.appendChild(link);
                link.click();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="flex justify-between align-center m-4">
                <h1 className="text-4xl">Contacts</h1>
                <div>
                    <button
                        onClick={(e) => getContactsAsExcel(e)}
                        className="btn-info"
                    >
                        Export as Excel
                    </button>
                    &nbsp;
                    <Link to={"/admin/contacts/new"} className="btn-add">
                        Add new
                    </Link>
                </div>
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
                                <tr key={c.id}>
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
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
