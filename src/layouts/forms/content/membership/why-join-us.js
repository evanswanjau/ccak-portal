import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { submitFormData } from "../../../../api/api-calls";
import { Alert } from "../../../../components/forms/alert";
import { BtnLoader } from "../../../../components/btnLoader";

export const WhyJoinUsSection = ({ data }) => {
    const [content, updateContent] = useState(data?.content);
    const [showForm, setShowForm] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const disabled = content.length === 0;

    const updateItem = (index, event) => {
        const newArray = [...content];
        newArray[index] = event.target.value;
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
                <h2 className="text-xl font-semibold">
                    Registration - Why join us
                </h2>
                {showForm ? (
                    <HiMinus className="text-xl text-white" />
                ) : (
                    <HiPlus className="text-xl text-white" />
                )}
            </div>

            {showForm && (
                <div className="p-5">
                    {error && <Alert type="error" message={error} />}
                    <div className="flex flex-col space-y-4 mb-5">
                        {content.map((item, i) => {
                            return (
                                <div key={i}>
                                    <div className="w-full">
                                        <label
                                            className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                            htmlFor="reason"
                                        >
                                            Reason {i + 1}
                                        </label>
                                        <input
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                            type="text"
                                            placeholder="Enter reason"
                                            value={item}
                                            onChange={(event) => {
                                                updateItem(i, event);
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
