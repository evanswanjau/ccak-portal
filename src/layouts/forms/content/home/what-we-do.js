import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { submitFormData } from "../../../../api/api-calls";
import { Alert } from "../../../../components/forms/alert";
import { Carousel } from "../../../../components/carousel";
import { Editor } from "../editor";

export const WhatWeDoSection = ({ data }) => {
    const [content, updateContent] = useState(data?.content);
    const [showForm, setShowForm] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const disabled =
        content.title === "" ||
        content.content === "" ||
        content.image === "" ||
        content.items.some((item) => item.title === "" || item.desc === "");

    const updateItem = (index, key, event) => {
        const newArray = [...content.items];
        newArray[index][key] = event.target.value;
        updateContent({ ...content, items: newArray });
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
                <h2 className="text-xl font-semibold">What We Do</h2>
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
                                    items={content.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex space-y-4 p-8"
                                        >
                                            <h1 className="font-lg font-semibold">
                                                SOLUTION {i + 1}
                                            </h1>
                                            <div className="w-full">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                                    htmlFor="title"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                                    type="text"
                                                    placeholder="Enter title"
                                                    value={item.title}
                                                    onChange={(event) => {
                                                        updateItem(
                                                            i,
                                                            "title",
                                                            event
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                                    htmlFor="position"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    className="block p-2.5 w-full text-sm text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-500"
                                                    placeholder={`Write description here...`}
                                                    value={item.desc}
                                                    onChange={(event) => {
                                                        updateItem(
                                                            i,
                                                            "desc",
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
                        ratio={5 / 4}
                        folder="home"
                        file_name={content.title + "jpg"}
                    />
                </div>
            )}
        </div>
    );
};
