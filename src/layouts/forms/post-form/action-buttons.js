import { useState, useEffect } from "react";
import {
    RiSendPlaneFill,
    RiArrowLeftLine,
    RiArrowRightLine,
    RiQuillPenFill,
} from "react-icons/ri";

export const ActionButtons = ({ data, updateData, submitData, exit }) => {
    const [loading, setLoading] = useState(false);
    const [autoSave, setAutoSave] = useState(false);

    const onStepBack = () => {
        if (data.step === "published") return "prepping";
        if (data.step === "prepping") return "writing";
        if (data.step === "writing") exit();
        if (data.step === "category") exit();
    };

    const publishDisabled = () => {
        let response = false;
        if (
            data.category === "news" ||
            data.category === "press-release" ||
            data.category === "news" ||
            data.category === "projects" ||
            data.category === "blog" ||
            data.category === "external-publications"
        ) {
            if (
                data.title === "" ||
                data.content === "" ||
                data.excerpt === "" ||
                data.access === "" ||
                data.image === ""
            )
                response = true;
        } else if (data.category === "events") {
            if (
                data.title === "" ||
                data.content === "" ||
                data.excerpt === "" ||
                data.access === "" ||
                data.image === ""
            )
                response = true;
        } else if (
            data.category === "careers" ||
            data.category === "consultancy" ||
            data.category === "funding-opportunities"
        ) {
            if (
                data.title === "" ||
                data.content === "" ||
                data.excerpt === "" ||
                data.access === ""
            )
                response = true;
        } else if (
            data.category === "photo-gallery" ||
            data.category === "internal-publications" ||
            data.category === "newsletters"
        ) {
            if (
                data.title === "" ||
                data.files.data.length < 1 ||
                data.excerpt === "" ||
                data.access === ""
            )
                response = true;
        }

        return response;
    };

    const draftDisabled = () => {
        let response = false;
        if (
            data.category === "photo-gallery" ||
            data.category === "internal-publications" ||
            data.category === "newsletters"
        ) {
            response =
                data.title === "" || data.files.data.length < 1 || loading;
        } else {
            response = data.title === "" || data.content === "" || loading;
        }

        return response;
    };

    let continueDisabled = draftDisabled;

    useEffect(() => {
        let intervalId = null;

        if (data.id) {
            intervalId = setInterval(() => {
                setAutoSave(true);
                submitData("post", "post/update/" + data.id, {
                    ...data,
                    status: "draft",
                }).then(() => {
                    setAutoSave(false);
                });
            }, 30000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [data]); // eslint-disable-line

    return (
        <div className="w-full flex justify-between shadow-sm rounded-t-lg p-2">
            <button
                type="button"
                className="flex focus:outline-none bg-gray-100 text-teal-900 hover:bg-gray-200 font-medium rounded-lg text-sm px-4 pt-2 pb-[0.8em] transition duration-150 ease-in-out"
                onClick={() => {
                    updateData({ ...data, step: onStepBack(data.step) });
                }}
            >
                <RiArrowLeftLine className="text-sm mr-2 mt-1" />
                Back
            </button>
            {data.step !== "category" && (
                <div className="flex space-x-4">
                    {autoSave && <p className="mx-4 pt-1">Autosaving ...</p>}
                    {data.step !== "published" && (
                        <button
                            type="button"
                            disabled={draftDisabled()}
                            className={`flex focus:outline-none ${
                                draftDisabled()
                                    ? "bg-gray-100"
                                    : "bg-gray-400 hover:bg-gray-500"
                            } text-white font-medium rounded-lg text-sm px-4 pt-2 pb-[0.8em] transition duration-150 ease-in-out`}
                            onClick={() => {
                                setLoading(true);
                                submitData(
                                    "post",
                                    "post/update/" + data.id,
                                    {
                                        ...data,
                                        status: "draft",
                                    },
                                    "Article draft saved successfully"
                                ).then(() => {
                                    setLoading(false);
                                    exit(false);
                                });
                            }}
                        >
                            {loading ? (
                                <>Saving ...</>
                            ) : (
                                <>Save as draft and exit</>
                            )}
                            <RiQuillPenFill className="text-sm ml-2 mt-1" />
                        </button>
                    )}

                    <div>
                        {data.step === "writing" && (
                            <button
                                type="button"
                                disabled={continueDisabled()}
                                className={`flex focus:outline-none ${
                                    continueDisabled()
                                        ? "text-white bg-gray-100"
                                        : "text-teal-900 bg-gray-100 hover:bg-gray-200"
                                }  font-medium rounded-lg text-sm px-4 pt-2 pb-[0.8em] transition duration-150 ease-in-out`}
                                onClick={() => {
                                    setLoading(true);
                                    submitData(
                                        "post",
                                        "post/update/" + data.id,
                                        {
                                            ...data,
                                            status: "draft",
                                            step: "prepping",
                                        },
                                        "Article draft saved successfully"
                                    ).then(() => {
                                        setLoading(false);
                                        updateData({
                                            ...data,
                                            step: "prepping",
                                        });
                                    });
                                }}
                            >
                                Continue
                                <RiArrowRightLine className="text-sm ml-2 mt-1" />
                            </button>
                        )}
                        {data.step === "prepping" && (
                            <button
                                type="button"
                                className={`flex focus:outline-none ${
                                    publishDisabled()
                                        ? "bg-gray-100"
                                        : "bg-teal-900 hover:bg-teal-950"
                                }  text-white font-medium rounded-lg text-sm px-4 pt-2 pb-[0.8em] transition duration-150 ease-in-out`}
                                onClick={() => {
                                    setLoading(true);
                                    submitData(
                                        "post",
                                        "post/update/" + data.id,
                                        {
                                            ...data,
                                            status: "published",
                                            step: "published",
                                        },
                                        "Article published successfully"
                                    ).then(() => {
                                        setLoading(false);
                                        updateData({
                                            ...data,
                                            step: "published",
                                        });
                                    });
                                }}
                            >
                                Publish
                                <RiSendPlaneFill className="text-sm ml-2 mt-1" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
