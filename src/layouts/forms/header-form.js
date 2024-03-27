import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { TextArea } from "../../components/forms/textarea";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { BtnLoader } from "../../components/btnLoader";
import { submitFormData } from "../../api/api-calls";
import { Alert } from "../../components/forms/alert";

export const HeaderForm = ({ data }) => {
    const [headerData, updateHeaderData] = useState(data?.content);
    const [showForm, setShowForm] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState("");

    const { enqueueSnackbar } = useSnackbar();
    const disabled = headerData.header === "";

    const submitData = () => {
        setBtnLoading(true);
        submitFormData("post", `/content/update/${data.id}`, {
            ...data,
            content: headerData,
        })
            .then((data) => {
                enqueueSnackbar(`Header updated successfully`, {
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
                <h2 className="text-xl font-semibold">Header</h2>
                {showForm ? (
                    <HiMinus className="text-xl text-white" />
                ) : (
                    <HiPlus className="text-xl text-white" />
                )}
            </div>

            {showForm && (
                <div className="p-5">
                    {error && <Alert type="error" message={error} />}
                    <TextArea
                        item="header"
                        data={headerData}
                        updateData={updateHeaderData}
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
