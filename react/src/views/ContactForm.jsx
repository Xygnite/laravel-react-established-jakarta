import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function ContactForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/contacts/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setContact(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }
    const onSubmit = (e) => {
        e.preventDefault();

        axiosClient
            .post(`/contacts`, contact)
            .then(() => {
                setNotification("Contact was created");
                navigate("/contacts");
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
    };

    return (
        <>
            {!contact.id && <h1>New Contacts</h1>}
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
                    <form onSubmit={onSubmit}>
                        <input
                            value={contact.name}
                            onChange={(ev) =>
                                setContact({
                                    ...contact,
                                    name: ev.target.value,
                                })
                            }
                            placeholder="Name"
                        ></input>
                        <input
                            type="email"
                            value={contact.email}
                            onChange={(ev) =>
                                setContact({
                                    ...contact,
                                    email: ev.target.value,
                                })
                            }
                            placeholder="Email"
                        ></input>
                        <textarea
                            onChange={(ev) =>
                                setContact({
                                    ...contact,
                                    message: ev.target.value,
                                })
                            }
                            placeholder="Message"
                        ></textarea>
                        <button className="btn">Save</button>
                        &nbsp;
                        <Link to={"/contacts"}>Cancel</Link>
                    </form>
                )}
            </div>
        </>
    );
}
