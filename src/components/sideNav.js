import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";
import {
    HiOutlineSquares2X2,
    HiOutlineCreditCard,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiChevronRight,
    HiChevronDown,
    HiOutlineNewspaper,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { IoDocumentsOutline } from "react-icons/io5";
import { apiRequest } from "../api/api-calls";

let pages = [
    {
        title: "Dashboard",
        link: "/",
        icon: <HiOutlineSquares2X2 className="text-2xl mt-[1px]" />,
    },
    {
        title: "Pages",
        link: "#",
        icon: <IoDocumentsOutline className="text-xl mt-[3px]" />,
        subPages: [
            {
                title: "Home",
                link: "/pages/home",
            },
            {
                title: "Who We Are",
                link: "#",
                subPages: [
                    {
                        title: "About Us",
                        link: "/pages/who-we-are/about-us",
                    },
                    {
                        title: "Our Team",
                        link: "/pages/who-we-are/our-team",
                    },
                ],
            },
            {
                title: "What We Do",
                link: "#",
                subPages: [
                    {
                        title: "What We Do",
                        link: "/pages/what-we-do",
                    },
                    {
                        title: "Projects",
                        link: "/pages/what-we-do/projects",
                    },
                ],
            },
            {
                title: "Get Involved",
                link: "#",
                subPages: [
                    {
                        title: "Careers",
                        link: "/pages/get-involved/careers",
                    },
                    {
                        title: "Consultancy",
                        link: "/pages/get-involved/consultancy",
                    },
                    {
                        title: "Funding Opportunities",
                        link: "/pages/get-involved/funding-opportunities",
                    },
                    {
                        title: "Donate",
                        link: "/pages/get-involved/donate",
                    },
                    {
                        title: "Contact Us",
                        link: "/pages/get-involved/contact-us",
                    },
                ],
            },
            {
                title: "Membership",
                link: "#",
                subPages: [
                    {
                        title: "Packages",
                        link: "/pages/membership/packages",
                    },
                    {
                        title: "Our Members",
                        link: "/pages/membership/our-members",
                    },
                    {
                        title: "Registration",
                        link: "/pages/membership/registration",
                    },
                ],
            },
            {
                title: "Media Centre",
                link: "#",
                subPages: [
                    {
                        title: "Press Release",
                        link: "/pages/media-centre/press-release",
                    },
                    {
                        title: "News",
                        link: "/pages/media-centre/news",
                    },
                    {
                        title: "Events",
                        link: "/pages/media-centre/events",
                    },
                    {
                        title: "Blog",
                        link: "/pages/media-centre/blog",
                    },
                    {
                        title: "Photo Gallery",
                        link: "/pages/media-centre/photo-gallery",
                    },
                ],
            },
            {
                title: "Resource Centre",
                link: "#",
                subPages: [
                    {
                        title: "Internal Publications",
                        link: "/pages/resource-centre/internal-publications",
                    },
                    {
                        title: "External Publications",
                        link: "/pages/resource-centre/external-publications",
                    },
                    {
                        title: "Newsletters",
                        link: "/pages/resource-centre/newsletters",
                    },
                ],
            },
        ],
    },
    {
        title: "Posts",
        link: "/posts",
        icon: <HiOutlineNewspaper className="text-xl mt-[3px]" />,
    },
    {
        title: "Social Posts",
        link: "/socialposts",
        icon: <HiOutlineNewspaper className="text-xl mt-[3px]" />,
    },
    {
        title: "Invoices",
        link: "/invoices",
        icon: <HiOutlineDocumentText className="text-xl mt-[3px]" />,
    },
    {
        title: "Payments",
        link: "/payments",
        icon: <HiOutlineCreditCard className="text-xl mt-[3px]" />,
    },
    {
        title: "Donations",
        link: "/donations",
        icon: <HiOutlineCurrencyDollar className="text-xl mt-[3px]" />,
    },
    {
        title: "Members",
        link: "/members",
        icon: <HiOutlineUsers className="text-xl mt-[3px]" />,
    },
    {
        title: "Subscribers",
        link: "/subscribers",
        icon: <HiOutlineUsers className="text-xl mt-[3px]" />,
    },
    {
        title: "Administrators",
        link: "/administrators",
        icon: <HiOutlineUsers className="text-xl mt-[3px]" />,
    },
];

const filterPages = (role) => {
    let list = [];

    if (role === "content-admin")
        list = ["Invoices", "Payments", "Administrators"];

    if (role === "finance-admin")
        list = ["Posts", "Social Hub", "Subscribers", "Administrators"];

    if (role === "admin") list = ["Administrators"];

    list.map((value) => {
        pages = pages.filter((item) => item["title"] !== value);

        return pages;
    });
};

const getUserID = () => {
    const token = localStorage.getItem("token");
    let user_id = "";

    if (!token) {
        window.location.replace("/login");
    } else {
        const decodedToken = jwt_decode(token);

        user_id = decodedToken.user_id;
    }

    return user_id;
};

const SideNav = () => {
    const [current, setCurrent] = useState("");
    const [subCurrent, setSubCurrent] = useState("");
    const [user, setUser] = useState({});

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        apiRequest(
            "get",
            "administrator/" + getUserID(),
            user,
            setUser,
            enqueueSnackbar
        );
    }, []); //eslint-disable-line

    if (user) filterPages(user.role);

    return (
        <div>
            <nav className="bg-teal-900 h-[calc(100vh-3.4em)] text-white text-sm font-light mt-12 overflow-auto">
                <ul>
                    {pages.map((page) => (
                        <li key={page.link} title={page.title}>
                            <a
                                href={page.link}
                                className={`flex justify-between border-b border-teal-800 ${
                                    page.title === current && "bg-teal-700"
                                } space-x-4 p-5 hover:bg-teal-700 transition duration-300 ease-in-out`}
                                onClick={() => {
                                    setCurrent(
                                        current === page.title ? "" : page.title
                                    );
                                }}
                            >
                                <div className="flex space-x-4">
                                    {page.icon}
                                    <span className="hidden md:block">
                                        {page.title}
                                    </span>
                                </div>
                                {page.subPages && (
                                    <div>
                                        {page.title !== current ? (
                                            <HiChevronRight className="text-md mt-1" />
                                        ) : (
                                            <HiChevronDown className="text-md mt-1" />
                                        )}
                                    </div>
                                )}
                            </a>

                            {page.title === current && page.subPages && (
                                <ul>
                                    {page.subPages.map((subPage) => (
                                        <li key={subPage.link}>
                                            <a
                                                href={subPage.link}
                                                className={`flex justify-between space-y-4 py-4 pl-8 pr-5 cursor-pointer border-b border-teal-800 ${
                                                    subPage.title ===
                                                        subCurrent &&
                                                    "bg-teal-700"
                                                }  hover:bg-teal-700`}
                                                onClick={() => {
                                                    setSubCurrent(
                                                        subCurrent ===
                                                            subPage.title
                                                            ? ""
                                                            : subPage.title
                                                    );
                                                }}
                                            >
                                                {subPage.title}
                                                {subPage.subPages && (
                                                    <div>
                                                        {subPage.title !==
                                                        subCurrent ? (
                                                            <HiChevronRight className="text-md mt-1" />
                                                        ) : (
                                                            <HiChevronDown className="text-md mt-1" />
                                                        )}
                                                    </div>
                                                )}
                                            </a>
                                            {subPage.title === subCurrent &&
                                                subPage?.subPages && (
                                                    <ul>
                                                        {subPage.subPages.map(
                                                            (subPage, i) => (
                                                                <a
                                                                    href={
                                                                        subPage.link
                                                                    }
                                                                >
                                                                    <li
                                                                        key={
                                                                            subPage.link
                                                                        }
                                                                        className={`py-3 pl-12 ${
                                                                            subPage
                                                                                .subPages
                                                                                ?.length !==
                                                                                i &&
                                                                            "border-b"
                                                                        } border-teal-800 hover:bg-teal-700 transition duration-300 ease-in-out cursor-pointer`}
                                                                    >
                                                                        {
                                                                            subPage.title
                                                                        }
                                                                    </li>
                                                                </a>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SideNav;
