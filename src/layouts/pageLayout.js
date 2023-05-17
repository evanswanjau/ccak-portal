import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import SideNav from "../components/sideNav";
import { AddButton } from "../components/addButton";
import { apiRequest } from "../api/api-calls";
import { Loader } from "../components/loader";
import { Empty } from "../components/empty";
import { getForm } from "../helpers/forms";

const PageLayout = ({ url, pageContent, addButton }) => {
    const [data, updateData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [revealForm, setRevealForm] = useState(false);
    const [id, setID] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const getData = () => {
        setLoading(true);
        apiRequest("get", url, {}, updateData, enqueueSnackbar).then(() => {
            setID(null);
            setLoading(false);
        });
    };

    const getContent = () => {
        if (loading) return <Loader />;

        if (revealForm) {
            addButton = false;
            return getForm(url, setRevealForm, id, getData);
        }

        if (!revealForm && data) {
            if (data.length < 1) return <Empty />;
            if (data.length > 0)
                return pageContent(data, updateData, setRevealForm, setID);
        }
    };

    useEffect(() => {
        getData();
    }, []); // eslint-disable-line

    return (
        <div className="flex">
            <div className="w-2/12">
                <SideNav />
            </div>
            <div className="w-10/12 p-10 pb-24 mt-8 h-[calc(100vh-3em)] overflow-scroll">
                {getContent()}
                {!loading && addButton && (
                    <AddButton setRevealForm={setRevealForm} />
                )}
            </div>
        </div>
    );
};

export default PageLayout;
