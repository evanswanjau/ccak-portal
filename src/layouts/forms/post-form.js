import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { StartWriting } from "./post-form/start-writing";
import { ActionButtons } from "./post-form/action-buttons";
import { apiRequest } from "../../api/api-calls";
import { ChooseCategory } from "./post-form/choose-category";
import { StartPrepping } from "./post-form/start-prepping";
import { Loader } from "../../components/loader";
import { Published } from "./post-form/published";

export const PostForm = ({ setRevealForm, id, getData }) => {
    const [loading, setLoading] = useState(true);
    const [data, updateData] = useState({
        title: "",
        excerpt: "",
        content: "",
        published: new Date().toISOString().slice(0, -8),
        category: "",
        folder: "",
        files: { data: [] },
        image: "",
        step: "category",
    });

    const { enqueueSnackbar } = useSnackbar();

    const submitData = (method, url, data, message = null) => {
        return apiRequest(
            method,
            url,
            data,
            updateData,
            enqueueSnackbar,
            message
        );
    };

    const exit = () => {
        if (data.step !== "category") {
            submitData("patch", "post/" + data.id, data);
        }

        getData();
        setRevealForm(false);
    };

    useEffect(() => {
        if (id) {
            apiRequest(
                "get",
                "post/" + id,
                data,
                updateData,
                enqueueSnackbar
            ).then(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []); // eslint-disable-line

    return (
        <div>
            <div>
                {loading ? (
                    <div className="p-10 mt-8 h-[calc(100vh-9em)]">
                        <Loader />
                    </div>
                ) : (
                    <div className="rounded-lg shadow-lg">
                        <ActionButtons
                            data={data}
                            updateData={updateData}
                            submitData={submitData}
                            exit={exit}
                        />

                        <div className="p-5">
                            {(data.step !== "category" &&
                                data.step !== "published") && (
                                <div>
                                    <h2 className="text-3xl text-gray-900 capitalize">
                                        {data.category.replace(/-/g, " ")}
                                    </h2>
                                    <h3 className="text-xl text-gray-400">
                                        {data.title}
                                    </h3>
                                </div>
                            )}

                            {data.step === "category" && (
                                <ChooseCategory
                                    data={data}
                                    updateData={updateData}
                                    submitData={submitData}
                                />
                            )}
                            {data.step === "writing" && (
                                <StartWriting
                                    data={data}
                                    updateData={updateData}
                                    submitData={submitData}
                                />
                            )}

                            {data.step === "prepping" && (
                                <StartPrepping
                                    data={data}
                                    updateData={updateData}
                                />
                            )}

                            {data.step === "published" && (
                                <Published
                                    data={data}
                                    updateData={updateData}
                                    submitData={submitData}
                                    getData={getData}
                                    setRevealForm={setRevealForm}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
