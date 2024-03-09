import { useState } from "react";
import { useSnackbar } from "notistack";
import { BtnLoader } from "../../components/btnLoader";
import { submitFormData } from "../../api/api-calls";
import { Input } from "../../components/forms/input";
import { Alert } from "../../components/forms/alert";

export const ChangePassword = ({ id }) => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [data, updateData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [error, setError] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const changePassword = () => {
        setError(false);
        setBtnLoading(true);

        if (data.new_password.length < 8) {
            setError("Password too short");
        } else {
            if (data.new_password === data.confirm_password) {
                submitFormData(
                    "patch",
                    `administrator/${id}/change-password`,
                    data
                )
                    .then(() => {
                        enqueueSnackbar(`Password changed successfully`, {
                            variant: "success",
                        });
                        updateData({
                            current_password: "",
                            new_password: "",
                            confirm_password: "",
                        });
                    })
                    .catch(({ response }) => {
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
            } else {
                setError("Passwords not similar");
            }
        }
        setBtnLoading(false);
    };

    let passwordDisabled =
        data.current_password === "" ||
        data.new_password === "" ||
        data.confirm_password === "";

    return (
        <div className="w-7/12 mx-auto rounded-lg shadow-lg">
            <div className="flex items-center justify-between px-5 py-2 shadow-sm rounded-t-lg">
                <h3 className="text-xl text-gray-600">Change password</h3>
            </div>
            <div className="p-5">
                {error && <Alert type="error" message={error} />}

                <Input
                    item="current_password"
                    label="Current Password"
                    type="text"
                    data={data}
                    updateData={updateData}
                />
                <Input
                    item="new_password"
                    label="New Password"
                    type="text"
                    data={data}
                    updateData={updateData}
                />
                <Input
                    item="confirm_password"
                    label="Confirm Password"
                    type="text"
                    data={data}
                    updateData={updateData}
                />
                <button
                    type="button"
                    disabled={passwordDisabled || btnLoading}
                    className={` ${
                        passwordDisabled || btnLoading
                            ? "bg-gray-100"
                            : " bg-teal-900 hover:bg-teal-950"
                    } w-full text-white font-medium rounded-lg text-sm pt-3 pb-[1em] transition duration-150 ease-in-out`}
                    onClick={() => {
                        changePassword();
                    }}
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
