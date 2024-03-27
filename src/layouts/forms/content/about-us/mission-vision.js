import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { BtnLoader } from "../../../../components/btnLoader";
import { submitFormData } from "../../../../api/api-calls";
import { Alert } from "../../../../components/forms/alert";
import { Carousel } from "../../../../components/carousel";

export const MissionVisionSection = ({ data }) => {
    const [content, updateContent] = useState(data?.content);
    const [showForm, setShowForm] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState("");

    const { enqueueSnackbar } = useSnackbar();
    const disabled = content.some(
        (item) => item.title === "" || item.content === ""
    );

    const updateItem = (index, key, event) => {
        const newArray = [...content];
        newArray[index][key] = event.target.value;
        updateContent(newArray);
    };

    const submitData = () => {
        setError("");
        setBtnLoading(true);
        submitFormData("post", `content/update/${data.id}`, {
            ...data,
            content: content,
        })
            .then(() => {
                enqueueSnackbar(`Section update successfully`, {
                    variant: "success",
                });
            })
            .catch((response) => {
                if (response.statusText === "Unauthorized") {
                    localStorage.setItem("token", "");
                    window.location.replace("/login");
                } else {
                    setError(
                        response?.data?.error ||
                            "Unable to submit, please refresh your page and try again"
                    );
                }
            })
            .finally(() => {
                setBtnLoading(false);
            });
    };

    return (
        <div className="w-full lg:w-8/12 rounded-lg shadow-lg mx-auto">
            <div
                className={`flex items-center justify-between bg-teal-900 text-white p-2 cursor-pointer ${
                    showForm ? "rounded-t-lg" : "rounded-lg"
                }`}
                onClick={() => setShowForm(!showForm)}
            >
                <h2 className="text-xl font-semibold">Mission Vision</h2>
                {showForm ? (
                    <HiMinus className="text-xl text-white" />
                ) : (
                    <HiPlus className="text-xl text-white" />
                )}
            </div>

            {showForm && (
                <div className="p-5">
                    {error && <Alert type="error" message={error} />}

                    <Carousel
                        items={content.map((item, i) => (
                            <div key={i} className="flex space-y-4 p-8">
                                <h1 className="font-lg font-semibold">
                                    {i === 0 ? "MISSION" : "VISION"}
                                </h1>
                                <div className="w-full">
                                    <label
                                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                        type="text"
                                        placeholder="Enter title name"
                                        value={item.title}
                                        onChange={(event) => {
                                            updateItem(i, "title", event);
                                        }}
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                        htmlFor="position"
                                    >
                                        Content
                                    </label>
                                    <textarea
                                        rows={2}
                                        className="block p-2.5 w-full text-sm text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-500"
                                        placeholder={`Write content here...`}
                                        value={item.content}
                                        onChange={(event) => {
                                            updateItem(i, "content", event);
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                        slides={1}
                        show={1}
                        reverse={false}
                    />
                    <button
                        type="button"
                        disabled={disabled || btnLoading}
                        className={` ${
                            disabled || btnLoading
                                ? "bg-gray-100"
                                : " bg-teal-900 hover:bg-teal-950"
                        } text-white font-medium rounded-lg text-sm pt-3 px-4 pb-[0.8em] transition duration-150 ease-in-out`}
                        onClick={() => {
                            submitData();
                        }}
                    >
                        {btnLoading ? (
                            <BtnLoader />
                        ) : (
                            <span className="tracking-widest">SUBMIT</span>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};
