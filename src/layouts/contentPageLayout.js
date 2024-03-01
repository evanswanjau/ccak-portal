import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import SideNav from "../components/sideNav";
import { searchData } from "../api/api-calls";
import { Loader } from "../components/loader";
import { AddButton } from "../components/addButton";

export const ContentPageLayout = ({
    page,
    content,
    data,
    updateData,
    revealForm,
    setRevealForm,
}) => {
    const [loading, setLoading] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        searchData(
            "content",
            {
                page,
            },
            updateData,
            null,
            enqueueSnackbar,
            null,
            setLoading
        );
    }, []); //eslint-disable-line

    return (
        <div className="flex">
            <div className="w-2/12">
                <SideNav />
            </div>
            <div className="w-10/12 p-10 pb-24 mt-8 h-[calc(100vh-2em)] overflow-y-auto">
                {loading && <Loader />}
                {!loading && data.length > 0 && content}
                {!loading && !revealForm && (
                    <AddButton setRevealForm={setRevealForm} />
                )}
            </div>
        </div>
    );
};
