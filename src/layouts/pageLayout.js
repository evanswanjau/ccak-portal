import React from "react";
import SideNav from "../components/sideNav";
import { Empty } from "../components/empty";
import { Loader } from "../components/loader";
import { AddButton } from "../components/addButton";

const PageLayout = ({ length, loading, content, addButton, action = null }) => {
    if (length < 1) content = <Empty />;
    if (loading) content = <Loader />;

    return (
        <div className="flex">
            <div className="w-2/12">
                <SideNav />
            </div>
            <div className="w-10/12 p-10 mt-12 h-[calc(100vh-3em)] overflow-scroll">
                {content}
                {addButton && <AddButton action={action} />}
            </div>
        </div>
    );
};

export default PageLayout;
