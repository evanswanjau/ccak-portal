import React from "react";
import {
    /*HiOutlineUser,*/ HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { logout } from "../helpers/auth";

const TopNav = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-900 shadow-lg px-5 py-3 z-20 fixed w-full">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">
                    CCAK-PORTAL
                </span>
            </div>
            <div className="flex space-x-6 font-light">
                {/* <button className="flex items-center text-white space-x-1">
                    <HiOutlineUser className="text-lg" />
                    <span>Account</span>
                </button> */}
                <button
                    className="flex items-center text-white space-x-1"
                    onClick={() => {
                        logout();
                    }}
                >
                    <HiOutlineArrowRightOnRectangle className="text-lg" />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default TopNav;
