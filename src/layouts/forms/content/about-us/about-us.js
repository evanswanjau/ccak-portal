import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { submitFormData } from "../../../../api/api-calls";
import { Alert } from "../../../../components/forms/alert";
import { Carousel } from "../../../../components/carousel";
import { Editor } from "../editor";

export const AboutUsSection = ({ data }) => {
    const [content, updateContent] = useState(data?.content);
    const [showForm, setShowForm] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const disabled = content.title === "" || content.content.some((item) => item.content === "");

    const updateItem = (index, key, event) => {
        const newArray = [...content.content];
        newArray[index][key] = event.target.value;
        updateContent({ ...content, content: newArray });
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
                            "Unable to submit, please check your connection and try again"
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
                <h2 className="text-xl font-semibold">About Us</h2>
                {showForm ? (
                    <HiMinus className="text-xl text-white" />
                ) : (
                    <HiPlus className="text-xl text-white" />
                )}
            </div>

            {showForm && (
                <div className="p-5">
                    {error && <Alert type="error" message={error} />}
                    <Editor
                        data={content}
                        updateData={updateContent}
                        submitData={submitData}
                        disabled={disabled}
                        btnLoading={btnLoading}
                        custom={
                            <div className="border border-teal-900 rounded-lg">
                                <Carousel
                                    items={content.content.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex space-y-4 p-8"
                                        >
                                            <h1 className="font-lg font-semibold">
                                                PARAGRAPH {i + 1}
                                            </h1>
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
                                                        updateItem(
                                                            i,
                                                            "content",
                                                            event
                                                        );
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    ))}
                                    slides={1}
                                    show={1}
                                    reverse={false}
                                />
                            </div>
                        }
                    />
                </div>
            )}
        </div>
    );
};
