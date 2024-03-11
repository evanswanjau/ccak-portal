import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Input } from "../components/forms/input";
import { submitFormData } from "../api/api-calls";
import { BtnLoader } from "../components/btnLoader";

export const ResetPassword = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [data, updateData] = useState({
        confirm_password: "",
        new_password: "",
        reset: true,
    });
    const [error, setError] = useState("");
    const [memberData, setMemberData] = useState(null);
    const { token } = useParams();

    useEffect(() => {
        try {
            localStorage.setItem("token", token);
            const decodedToken = jwt_decode(token);
            setMemberData(decodedToken);
        } catch (err) {
            setError("Invalid token");
        }
    }, [token]);

    const { enqueueSnackbar } = useSnackbar();

    const resetPassword = () => {
        setError("");
        setBtnLoading(true);

        if (data.new_password.length < 8) {
            setError("Password too short");
        } else {
            if (data.new_password === data.confirm_password) {
                submitFormData(
                    "patch",
                    `administrator/${memberData?.user_id}/change-password`,
                    data
                )
                    .then(() => {
                        enqueueSnackbar("Password changed successfully", {
                            variant: "success",
                        });
                        updateData({
                            new_password: "",
                            confirm_password: "",
                        });
                        setTimeout(() => {
                            localStorage.setItem("token", "");
                            window.location.replace("/login");
                        }, 3000);
                    })
                    .catch(({ response }) => {
                        setError(
                            response?.data?.error ||
                                "Unable to submit, please check your connection and try again"
                        );
                    })
                    .finally(() => {
                        setBtnLoading(false);
                    });
            } else {
                setError("Passwords not similar");
            }
        }
        setBtnLoading(false);
    };

    let disabled = data.password === "" || data.confirm_password === "";

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-teal-900">
            <h1 className="text-3xl text-center font-extrabold mb-8 text-white">
                CMS PORTAL
            </h1>
            <div className="w-11/12 sm:w-10/12 md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-lg rounded-lg mx-auto p-5 bg-white shadow-gray-800">
                <img src="/logo.png" alt="CCAK Logo" className="w-28 mx-auto" />
                <div className="text-center my-5">
                    <h3 className="font-bold tracking-wide">RESET PASSWORD</h3>
                    <p className=" text-gray-500 my-2">
                        Enter your email address and we'll send you instructions
                        to reset your password.
                    </p>
                </div>
                {error !== "" && (
                    <div
                        className="flex items-center p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50"
                        role="alert"
                    >
                        <svg
                            className="flex-shrink-0 inline w-4 h-4 mr-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>{error}</div>
                    </div>
                )}

                <Input
                    item="new_password"
                    label="New Password"
                    type="password"
                    data={data}
                    updateData={updateData}
                />
                <Input
                    item="confirm_password"
                    label="Confirm New Password"
                    type="password"
                    data={data}
                    updateData={updateData}
                />
                <button
                    type="button"
                    disabled={disabled}
                    className={` ${
                        disabled || btnLoading
                            ? "bg-gray-100"
                            : " bg-teal-900 hover:bg-teal-950"
                    } w-full text-white font-medium rounded-lg text-sm pt-3 pb-[1em] transition duration-150 ease-in-out`}
                    onClick={() => resetPassword()}
                >
                    {btnLoading ? (
                        <BtnLoader />
                    ) : (
                        <span className="tracking-widest">SUBMIT</span>
                    )}
                </button>
            </div>
        </div>
    );
};
