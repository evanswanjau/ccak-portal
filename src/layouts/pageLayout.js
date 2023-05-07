import React from "react";
import SideNav from "../components/sideNav";
import { Empty } from "../components/empty";
import { Loader } from "../components/loader";

const PageLayout = ({ length, loading, content }) => {
    if (length < 1) content = <Empty />;
    if (loading) content = <Loader />;

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
