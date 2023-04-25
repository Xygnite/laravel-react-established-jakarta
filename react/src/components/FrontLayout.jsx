import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaAngleDown } from "react-icons/fa";
import {
    Link,
    Navigate,
    Outlet,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from "react-simple-captcha";

export default function FrontLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext();
    const [contact, setContact] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [captcha, setCaptcha] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [banners, setBanners] = useState(null);
    const { setNotification } = useStateContext();
    useEffect(() => {
        loadCaptchaEnginge(6);
        getBanners();
    }, []);
    const getBanners = () => {
        setLoading(true);
        axiosClient
            .get("/banners")
            .then(({ data }) => {
                setLoading(false);
                console.log(data.data);
                setBanners(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    const [rollingText, setRollingText] = useState([
        "strategy",
        "place",
        "partner",
        "time",
    ]);
    const CarouselItem = ({ url }) => (
        <div>
            <img
                className="min-h-[20rem] max-h-[20rem] sm:min-h-[20rem] sm:max-h-[40rem] md:min-h-[20rem] h-auto min-w-full object-cover"
                src={url}
            />
        </div>
    );

    const CarouselTextItem = ({ text }) => (
        <div>
            <p className="text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-8xl font-bold theme-color-gradient text-left">
                {text}
            </p>
        </div>
    );

    const MyCarousel = () => (
        <Carousel
            autoPlay={true}
            interval={3000}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
                const defStyle = {
                    marginLeft: 20,
                    backgroundColor: "grey",
                    cursor: "pointer",
                    opacity: 1,
                };
                const style = isSelected
                    ? {
                          ...defStyle,
                          backgroundColor: "white",
                          width: "100px",
                          borderRadius: "50px",
                      }
                    : { ...defStyle };
                return (
                    <span
                        className="dot"
                        style={style}
                        onClick={onClickHandler}
                        onKeyDown={onClickHandler}
                        value={index}
                        key={index}
                        role="button"
                        tabIndex={0}
                        aria-label={`${label} ${index + 1}`}
                    ></span>
                );
            }}
        >
            {banners &&
                banners.map((b) => {
                    console.log();
                    return (
                        <CarouselItem
                            url={`${import.meta.env.VITE_API_BANNER_URL}${
                                b.path
                            }`}
                        />
                    );
                })}
        </Carousel>
    );

    const onClickReload = (ev) => {
        ev.preventDefault();
        loadCaptchaEnginge(6);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateCaptcha(captcha) == true) {
            alert("Captcha Does Not Match");
            return;
        }

        axiosClient
            .post(`/contacts`, contact)
            .then(() => {
                setNotification("Message was sent successfully");
                setContact({
                    name: "",
                    email: "",
                    message: "",
                });
                setCaptcha("");
                loadCaptchaEnginge(6);
            })
            .catch((error) => {
                loadCaptchaEnginge(6);
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
        <div id="defaultLayout">
            <div className="content">
                <header className="sticky top-0 z-50">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <img src="/logo.png" className="logo"></img>
                        </div>
                        <div className="ms-5 sm:ms-10 md:ms-14 lg:ms-18 xl:ms-22">
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                                About Us
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl theme-color font-bold">
                            Contact Us
                        </p>
                    </div>
                </header>
                <main>
                    <div id="bannerContainer">
                        <div className="img-container">
                            <MyCarousel />
                            <div class="img-centered-text">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    className="h-8 sm:h-12 md:h-16 lg:h-24 xl:h-32"
                                >
                                    <div>
                                        <p className="text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-8xl font-bold">
                                            The right&nbsp;
                                        </p>
                                    </div>
                                    <div>
                                        <Carousel
                                            autoPlay={true}
                                            interval={3000}
                                            infiniteLoop={true}
                                            showThumbs={false}
                                            showStatus={false}
                                            showArrows={false}
                                            showIndicators={false}
                                            axis="vertical"
                                        >
                                            {rollingText.map((e) => (
                                                <CarouselTextItem text={e} />
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                                <p className="sm:text-xl md:text-2xl text-l">
                                    That's what marketing is all about. Our
                                    expertise in strategizing a remarkable
                                    digital marketing strategy ensures you are
                                    achieving your big goals.
                                </p>
                                <center>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 my-1 sm:w-8 sm:h-8 sm:my-4 md:w-10 md:h-10 md:my-6 lg:w-12 lg:h-12 lg:my-8 xl:w-14 xl:h-14 xl:my-10"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div
                        id="pointContainer"
                        className="p-5 sm:p-10 justify-around flex"
                    >
                        <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ">
                            <p className="theme-color-dark">
                                What Your Business
                            </p>
                            <p className="theme-color">Can Do</p>
                        </div>
                        <div>
                            <ol className="list-decimal text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold font-bold theme-color-dark max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
                                <li>
                                    <p>
                                        Nullam id pellentesque nulla. Fusce
                                        metus augue, fringilla ut condimentum
                                        at, ullamcorper id eros. Lorem ipsum
                                        dolor sit amet, consectetur adipiscing
                                        elit. Nullam sapien diam, feugiat eu
                                        suscipit quis, ultrices laoreet sapien.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Cras a quam lorem. Aenean nisl arcu,
                                        eleifend a semper pharetra, porta non
                                        quam. Duis vitae mauris libero. Nunc
                                        gravida fringilla neque, eu accumsan
                                        sapien tincidunt quis. Donec at molestie
                                        massa. Quisque ut posuere arcu.
                                        Phasellus eget mauris urna. Curabitur
                                        tellus augue, venenatis et sodales id,
                                        mattis et neque.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Donec non libero accumsan, auctor ex
                                        vel, condimentum massa. Curabitur
                                        iaculis posuere nibh eu maximus. Nullam
                                        vitae consequat dui. Nulla facilisi.
                                        Nunc mi nibh, tempus eget ultricies vel,
                                        condimentum sed lacus. Curabitur quis
                                        leo laoreet, ornare mi ultricies,
                                        sollicitudin lectus. Aliquam erat
                                        volutpat.bg-white py-3 flex w-min
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Nullam id pellentesque nulla. Fusce
                                        metus augue, fringilla ut condimentum
                                        at, ullamcorper id eros. Lorem ipsum
                                        dolor sit amet, consectetur adipiscing
                                        elit. Nullam sapien diam, feugiat eu
                                        suscipit quis, ultrices laoreet sapien.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div
                        id="contactContainer"
                        className="p-10 sm:p-20 justify-center bg-theme-color-dark"
                    >
                        <div className="flex text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold justify-center ">
                            <p className="text-white">Contact</p>
                            <p className="ms-2 theme-color">Us</p>
                        </div>
                        <div className="my-10">
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold font-bold text-white text-center max-w-20">
                                Integer porta metus eu nulla lacinia, porttitor
                                ultricies diam tincidunt. Sed sed elit accumsan,
                                finibus arcu quis, convallis massa. Class aptent
                                taciti sociosqu ad litora torquent per conubia
                                nostra, per inceptos himenaeos. Sed enim lacus,
                                pretium facilisis augue a, dictum iaculis lorem.
                                Nulla pretium lobortis elit, a venenatis lectus
                                faucibus at. Maecenas pretium risus dapibus
                                fermentum varius. Quisque cursus lacus quis
                                egestas volutpat.{" "}
                            </p>
                        </div>
                        <div className="m-5 p-5 sm:m-8 sm:p-8 md:m-10 md:p-10 lg:m-14 lg:p-14 xl:m-20 xl:p-20  rounded-2xl bg-gradient-to-br from-[#5b5b5b] from-20% to-secondary shadow">
                            <form className="mb-4" onSubmit={onSubmit}>
                                <div className="flex mb-10">
                                    <input
                                        value={contact.name}
                                        onChange={(ev) =>
                                            setContact({
                                                ...contact,
                                                name: ev.target.value,
                                            })
                                        }
                                        className="appearance-none border-b-2 text-white bg-inherit w-full me-5 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Your Name"
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
                                        className="appearance-none border-b-2 text-white bg-inherit w-full ms-5 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Your Email Address"
                                    ></input>
                                </div>
                                <textarea
                                    value={contact.message}
                                    onChange={(ev) =>
                                        setContact({
                                            ...contact,
                                            message: ev.target.value,
                                        })
                                    }
                                    className="mb-4 appearance-none border-b-2 text-white bg-inherit w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Message"
                                ></textarea>
                                <div className="sm:flex">
                                    <div className="flex border rounded sm:me-5 w-min">
                                        <div className="bg-white py-3 flex w-min">
                                            <LoadCanvasTemplateNoReload />
                                        </div>
                                        <button
                                            className="px-2 py-3 bg-primary rounded-tr rounded-br"
                                            onClick={(ev) => onClickReload(ev)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex border rounded sm:me-5 my-2 sm:my-0 w-min">
                                        <input
                                            value={captcha}
                                            onChange={(ev) =>
                                                setCaptcha(ev.target.value)
                                            }
                                            placeholder="Type Captcha"
                                            className="bg-white py-3 px-2 flex w-min"
                                        ></input>
                                    </div>
                                    <button className=" my-4 sm:my-0 rounded py-3 px-4 sm:py-4 sm:px-8 bg-theme-color text-white">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
