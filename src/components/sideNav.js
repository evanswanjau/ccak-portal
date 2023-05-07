import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    HiOutlineSquares2X2,
    HiOutlineCreditCard,
    HiOutlineHome,
    HiOutlineUsers,
    HiChevronRight,
    HiChevronDown,
} from "react-icons/hi2";
import { IoDocumentsOutline } from "react-icons/io5";

const pages = [
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
                link: "/pages/what-we-do",
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
                        title: "Membership Packages",
                        link: "/pages/membership/membership-packages",
                    },
                ],
            },
            {
                title: "Media Centre",
                link: "#",
                subPages: [
                    {
                        title: "Press Releases",
                        link: "/pages/media-centre/press-releases",
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
                        title: "Projects",
                        link: "/pages/media-centre/projects",
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
                        title: "Research Papers",
                        link: "/pages/resource-centre/research-papers",
                    },
                    {
                        title: "AGM Material",
                        link: "/pages/resource-centre/agm-material",
                    },
                ],
            },
        ],
    },
    {
        title: "Payments",
        link: "/payments",
        icon: <HiOutlineCreditCard className="text-xl mt-[3px]" />,
    },
    {
        title: "Social Hub",
        link: "/social-hub",
        icon: <HiOutlineHome className="text-xl mt-[3px]" />,
    },
    {
        title: "Users",
        link: "/users",
        icon: <HiOutlineUsers className="text-xl mt-[3px]" />,
    },
];

const SideNav = () => {
    const [current, setCurrent] = useState("");
    const [subCurrent, setSubCurrent] = useState("");

    return (
        <div>
            <nav className="bg-teal-900 h-[calc(100vh-3em)] text-white font-light mt-12 overflow-auto">
                <ul>
                    {pages.map((page) => (
                        <li key={page.link}>
                            <Link
                                to={page.link}
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
                                    <span>{page.title}</span>
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
                            </Link>

                            {page.title === current && page.subPages && (
                                <ul>
                                    {page.subPages.map((subPage) => (
                                        <li key={subPage.link}>
                                            <Link
                                                to={subPage.link}
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
                                            </Link>
                                            {subPage.title === subCurrent &&
                                                subPage?.subPages && (
                                                    <ul>
                                                        {subPage.subPages.map(
                                                            (subPage, i) => (
                                                                <Link
                                                                    to={
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
                                                                </Link>
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
