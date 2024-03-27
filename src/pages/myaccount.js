import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";
import SideNav from "../components/sideNav";
import { AuthAdministrator } from "../helpers/auth";
import { Input } from "../components/forms/input";
import { Alert } from "../components/forms/alert";
import { apiRequest, submitFormData } from "../api/api-calls";
import { BtnLoader } from "../components/btnLoader";
import { ChangePassword } from "../layouts/forms/change-password";

const getUserID = () => {
    const token = localStorage.getItem("token");
    let user_id = "";

    if (!token) {
        window.location.replace("/login");
    } else {
        const decodedToken = jwt_decode(token);

        user_id = decodedToken.user_id;
    }

    return user_id;
};

export const MyAccount = ({ page, searchQuery, addButton }) => {
    const [btnLoading, setBtnLoading] = useState(true);
    const [data, updateData] = useState([]);
    const [error, setError] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const submitData = () => {
        setBtnLoading(true);
        setError("");

        let url = `administrator${data.id ? "/update/" + data.id : ""}`;
        let action = "updated";

        submitFormData("patch", url, data)
            .then(() => {
                enqueueSnackbar(`Account ${action} successfully`, {
                    variant: "success",
                });
            })
            .catch(({ response }) => {
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

    useEffect(() => {
        AuthAdministrator(jwt_decode);
        apiRequest(
            "get",
            "administrator/" + getUserID(),
            data,
            updateData,
            enqueueSnackbar
        ).then(() => {
            setBtnLoading(false);
        });
    }, []); // eslint-disable-line

    let disabled =
        data.first_name === "" || data.last_name === "" || data.password === "";

    return (
        <div className="flex">
            <div className="w-2/12">
                <SideNav />
            </div>
            <div className="w-full lg:w-10/12 flex flex-col space-y-8 p-10 pb-24 mt-8 h-[calc(100vh-2em)] overflow-y-auto">
                <div className="w-7/12 mx-auto rounded-lg shadow-lg">
                    <div className="flex items-center justify-between px-5 py-2 shadow-sm rounded-t-lg">
                        <h3 className="text-xl text-gray-600">
                            Update my account
                        </h3>
                    </div>
                    <div className="p-5">
                        {error && <Alert type="error" message={error} />}

                        <div className="flex space-x-4">
                            <Input
                                item="first_name"
                                label="First Name"
                                type="text"
                                data={data}
                                updateData={updateData}
                            />
                            <Input
                                item="last_name"
                                label="Last Name"
                                type="text"
                                data={data}
                                updateData={updateData}
                            />
                        </div>
                        <button
                            type="button"
                            disabled={disabled || btnLoading}
                            className={` ${
                                disabled || btnLoading
                                    ? "bg-gray-100"
                                    : " bg-teal-900 hover:bg-teal-950"
                            } w-full text-white font-medium rounded-lg text-sm pt-3 pb-[1em] transition duration-150 ease-in-out`}
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
                </div>
                <ChangePassword id={data.id} />
            </div>
        </div>
    );
};
