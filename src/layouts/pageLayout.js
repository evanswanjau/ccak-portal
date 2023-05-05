import React from "react";
import SideNav from "../components/sideNav";


const PageLayout = ({ content }) => {
    return (
        <div className="flex">
            <div className="w-2/12">
                <SideNav />
            </div>
            <div className="w-10/12 p-5 mt-14">{content}</div>
        </div>
    );
};

export default PageLayout;
