import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { submitFormData } from "../../../../api/api-calls";
import { Alert } from "../../../../components/forms/alert";
import { Editor } from "../editor";
import { Carousel } from "../../../../components/carousel";

export const AchievementsSection = ({ data }) => {
    const [content, updateContent] = useState(data?.content);
    const [showForm, setShowForm] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const disabled =
        content.title === "" ||
        content.achievements.some(
            (item) => item.achievement === "" || item.count === ""
        );

    const updateItem = (index, key, event) => {
        const newArray = [...content.achievements];
        newArray[index][key] = event.target.value;
        updateContent({ ...content, achievements: newArray });
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
                <h2 className="text-xl font-semibold">Achievements</h2>
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
                                    items={content.achievements.map(
                                        (item, i) => (
                                            <div
                                                key={i}
                                                className="flex space-y-4 p-8"
                                            >
                                                <h1 className="font-lg font-semibold">
                                                    ACHIEVEMENT {i + 1}
                                                </h1>
                                                <div className="w-full">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                                        htmlFor="name"
                                                    >
                                                        Achievement
                                                    </label>
                                                    <input
                                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                                        type="text"
                                                        placeholder="Enter achivement name"
                                                        value={item.achievement}
                                                        onChange={(event) => {
                                                            updateItem(
                                                                i,
                                                                "achievement",
                                                                event
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                                        htmlFor="number"
                                                    >
                                                        Number
                                                    </label>
                                                    <input
                                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                                        type="number"
                                                        placeholder="Enter number"
                                                        value={item.count}
                                                        onChange={(event) => {
                                                            updateItem(
                                                                i,
                                                                "count",
                                                                event
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
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