import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Banners() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getBanners();
    }, []);

    const { setNotification } = useStateContext();

    const onDelete = (b) => {
        if (!window.confirm("Delete this Banner?")) {
            return;
        }
        axiosClient.delete(`/banners/${b.id}`).then(() => {
            setNotification(`Banner ${b.name} was deleted`);
            getBanners();
        });
    };
    const getBanners = () => {
        setLoading(true);
        axiosClient
            .get("/banners")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setBanners(data.data);
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
                <h1>Banners</h1>
                <Link to={"/banners/new"} className="btn-add">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Priority</th>
                            <th>Path</th>
                            <th>Preview</th>
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
                            {banners.map((b) => (
                                <tr key={b.id}>
                                    <td>{b.id}</td>
                                    <td>{b.priority}</td>
                                    <td>{b.path}</td>
                                    <td>
                                        <img
                                            className="img-preview"
                                            src={`${
                                                import.meta.env
                                                    .VITE_API_BASE_URL
                                            }/storage/bannersImage/${b.path}`}
                                        ></img>
                                    </td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={"/banners/" + b.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(e) => onDelete(b)}
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
