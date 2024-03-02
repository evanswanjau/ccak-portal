import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { submitFormData } from "../../../../api/api-calls";
import { Alert } from "../../../../components/forms/alert";
import { Editor } from "../editor";

export const ContactUsSection = ({ data }) => {
    const [content, updateContent] = useState(data?.content);
    const [showForm, setShowForm] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const disabled =
        content.title === "" ||
        content.content === "" ||
        Object.keys(content.contact).some((key) => content.contact[key] === "");

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
            .catch(() => {
                setError(
                    "Unable to submit, please check your connection try again"
                );
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
                <h2 className="text-xl font-semibold">Contact Us</h2>
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
                            <div className="flex flex-col space-y-4">
                                {Object.keys(content.contact).length > 0 &&
                                    Object.keys(content.contact).map(
                                        (key, i) => (
                                            <div className="w-full" key={i}>
                                                <label
                                                    className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                                    htmlFor="name"
                                                >
                                                    {key}
                                                </label>
                                                <input
                                                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                                    type="text"
                                                    placeholder={`Enter ${key}`}
                                                    value={content.contact[key]}
                                                    onChange={(event) => {
                                                        updateContent({
                                                            ...content,
                                                            contact: {
                                                                ...content.contact,
                                                                [key]: event
                                                                    .target
                                                                    .value,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}
                            </div>
                        }
                    />
                </div>
            )}
        </div>
    );
};
