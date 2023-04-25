import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function BannerForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [banner, setBanner] = useState({
        id: null,
        priority: 0,
        path: {},
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/banners/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setBanner(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(banner);
        const formData = new FormData();
        formData.append("priority", banner.priority);
        formData.append("path", banner.path);
        if (banner.id) {
            axiosClient
                .put(`/banners/${banner.id}`, banner)
                .then(() => {
                    setNotification("Banner was created");
                    navigate("/admin/banners");
                })
                .catch((error) => {
                    // console.log(error);
                    const response = error.response;
                    if (response && response.status === 402) {
                        console.log(response.data.errors);
                    }
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/banners`, formData)
                .then(() => {
                    setNotification("Banner was created");
                    navigate("/admin/banners");
                })
                .catch((error) => {
                    // console.log(error);
                    const response = error.response;
                    if (response && response.status === 402) {
                        console.log(response.data.errors);
                    }
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {!banner.id && <h1>New Banners</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <input
                            type="number"
                            value={banner.priority}
                            onChange={(ev) =>
                                setBanner({
                                    ...banner,
                                    priority: ev.target.value,
                                })
                            }
                            placeholder="Priority"
                        ></input>
                        {banner.id && (
                            <div>
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_BANNER_URL
                                    }${banner.path}`}
                                ></img>
                            </div>
                        )}
                        {!banner.id && (
                            <input
                                type="file"
                                name="path"
                                onChange={(ev) => {
                                    if (ev.target.files.length > 0) {
                                        setBanner({
                                            ...banner,
                                            path: ev.target.files[0],
                                        });
                                    }
                                }}
                                placeholder="Path"
                            ></input>
                        )}
                        <button className="btn">Save</button>
                        &nbsp;
                        <Link to={"/admin/banners"}>Cancel</Link>
                    </form>
                )}
            </div>
        </>
    );
}
