import React from "react";
import { Link } from "react-router-dom";
import {
    HiOutlineSquares2X2,
    HiOutlineCreditCard,
    HiOutlineHome,
    HiOutlineUsers,
} from "react-icons/hi2";
import { IoDocumentsOutline } from "react-icons/io5";

const pages = [
    {
        title: "Dashboard",
        link: "/",
        icon: <HiOutlineSquares2X2 className="text-2xl" />,
    },
    {
        title: "Pages",
        link: "/pages",
        icon: <IoDocumentsOutline className="text-xl" />,
        subPages: [
            {
                title: "Home",
                link: "/pages/home",
            },
            {
                title: "Who We Are",
                link: "/pages/who-we-are",
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
                link: "/pages/get-involved",
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
                link: "/pages/membership",
                subPages: [
                    {
                        title: "Membership Packages",
                        link: "/pages/membership/membership-packages",
                    },
                ],
            },
            {
                title: "Media Centre",
                link: "/pages/media-centre",
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
                link: "/pages/resource-centre",
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
        icon: <HiOutlineCreditCard className="text-xl" />,
    },
    {
        title: "Social Hub",
        link: "/social-hub",
        icon: <HiOutlineHome className="text-xl" />,
    },
    {
        title: "Users",
        link: "/users",
        icon: <HiOutlineUsers className="text-xl" />,
    },
];

const SideNav = () => {
    return (
        <div>
            <nav className="bg-teal-900 h-[calc(100vh-3em)] text-white font-light mt-12">
                <ul>
                    {pages.map((page) => (
                        <li
                            key={page.link}
                            className="border-b border-teal-800 p-5"
                        >
                            <div className="flex space-x-4">
                                {page.icon}
                                <Link to={page.link}>{page.title}</Link>
                            </div>

                            {/* {page.subPages && (
                                <ul>
                                    {page.subPages.map((subPage) => (
                                        <li key={subPage.link}>
                                            <Link to={subPage.link}>
                                                {subPage.title}
                                            </Link>
                                            {subPage.subPages && (
                                                <ul>
                                                    {subPage.subPages.map(
                                                        (subPage) => (
                                                            <li
                                                                key={
                                                                    subPage.link
                                                                }
                                                            >
                                                                <Link
                                                                    to={
                                                                        subPage.link
                                                                    }
                                                                >
                                                                    {
                                                                        subPage.title
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )} */}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SideNav;
