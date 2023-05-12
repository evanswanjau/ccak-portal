import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import SideNav from "../components/sideNav";
import { AddButton } from "../components/addButton";
import { apiRequest } from "../api/api-calls";
import { Loader } from "../components/loader";
import { Empty } from "../components/empty";
import { getForm } from "../helpers/forms";

const PageLayout = ({ url, pageContent, addButton }) => {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [revealForm, setRevealForm] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const getData = () => {
        apiRequest("get", url)
            .then(({ data }) => {
                setData(data);
                setLoading(false);
            })
            .catch(({ message }) => {
                enqueueSnackbar(message, {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                });
            });
    };

    const getContent = () => {
        if (loading) return <Loader />;

        if (revealForm) {
            addButton = false;
            return getForm(url, setRevealForm);
        }

        if (!revealForm && data) {
            if (data.length < 1) return <Empty />;
            if (data.length > 1) return pageContent(data);
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
            <div className="w-10/12 p-10 mt-12 h-[calc(100vh-3em)] overflow-scroll">
                {getContent()}
                {!loading && addButton && (
                    <AddButton setRevealForm={setRevealForm} />
                )}
            </div>
        </div>
    );
};

export default PageLayout;
