import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { apiRequest, submitFormData } from "../../api/api-calls";
import { Loader } from "../../components/loader";
import { Input } from "../../components/forms/input";
import { BtnLoader } from "../../components/btnLoader";
import { IoClose } from "react-icons/io5";
import { Toggle } from "../../components/forms/toggle";
import { Alert } from "../../components/forms/alert";

export const MemberForm = ({ setRevealForm, id, getData, setID }) => {
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, updateData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        company: "",
        designation: "",
        registration_status: "unregistered",
        subscription_status: "inactive",
        status: "active",
    });

    const { enqueueSnackbar } = useSnackbar();

    const generatePassword = () => {
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        const shuffled = characters
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");

        let password = "";

        for (let i = 0; i < 8; i++) {
            password += shuffled[i];
        }

        updateData({ ...data, password: password });
    };

    const exitForm = () => {
        setRevealForm(false);
        updateData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            company: "",
            designation: "",
            registration_status: "unregistered",
            subscription_status: "inactive",
            status: "active",
        });
        getData();
        setID(null);
    };

    const submitData = () => {
        setBtnLoading(true);
        setError("");

        let method = id ? "patch" : "post";
        let url = `member${id ? "/update/" + id : ""}`;
        let action = id ? "updated" : "created";

        if (id) {
        }

        submitFormData(method, url, data)
            .then(() => {
                enqueueSnackbar(`Member ${action} successfully`, {
                    variant: "success",
                });
                exitForm();
            })
            .catch(({ response }) => {
                let errors = response.data;
                let keys = Object.keys(response.data);

                setError(errors[keys[0]][0]);
            })
            .finally(() => {
                setBtnLoading(false);
            });
    };

    let disabled =
        data.first_name === "" ||
        data.last_name === "" ||
        data.email === "" ||
        data.phone_number === "";

    console.log(data);

    useEffect(() => {
        if (id) {
            apiRequest(
                "get",
                "member/" + id,
                data,
                updateData,
                enqueueSnackbar
            ).then(() => {
                setLoading(false);
            });
        } else {
            generatePassword();
            setLoading(false);
        }
    }, []); // eslint-disable-line

    return (
        <div>
            <div>
                {loading ? (
                    <div className="p-10 mt-8 h-[calc(100vh-9em)]">
                        <Loader />
                    </div>
                ) : (
                    <div className="w-7/12 mx-auto rounded-lg shadow-lg">
                        <div className="flex items-center justify-between px-5 py-2 shadow-sm rounded-t-lg">
                            <h3 className="text-xl text-gray-600">
                                {id ? "Update member" : "Create new member"}
                            </h3>
                            <div
                                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-600"
                                title="close"
                                onClick={() => {
                                    setRevealForm(false);
                                    updateData({
                                        first_name: "",
                                        last_name: "",
                                        email: "",
                                        password: "",
                                        company: "",
                                        designation: "",
                                        registration_status: "unregistered",
                                        subscription_status: "inactive",
                                        status: "active",
                                    });
                                }}
                            >
                                <IoClose className="text-2xl" />
                            </div>
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

                            <div className="flex space-x-4">
                                <Input
                                    item="email"
                                    label="Email"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                                <Input
                                    item="phone_number"
                                    label="Phone"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                            </div>

                            <div className="flex space-x-4">
                                <Input
                                    item="company"
                                    label="Company (Optional)"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                                <Input
                                    item="designation"
                                    label="Designation (Optional)"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                            </div>

                            <Toggle
                                item="registration_status"
                                data={data}
                                updateData={updateData}
                            />

                            <Toggle
                                item="subscription_status"
                                data={data}
                                updateData={updateData}
                            />
                            <Toggle
                                item="status"
                                data={data}
                                updateData={updateData}
                            />
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
                                    <span className="tracking-widest">
                                        SUBMIT
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
