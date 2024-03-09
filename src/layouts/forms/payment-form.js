import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { apiRequest, submitFormData } from "../../api/api-calls";
import { Loader } from "../../components/loader";
import { Input } from "../../components/forms/input";
import { BtnLoader } from "../../components/btnLoader";
import { IoClose } from "react-icons/io5";
import { Select } from "../../components/forms/select";
import { Alert } from "../../components/forms/alert";

export const PaymentForm = ({ setRevealForm, id, getData, setID }) => {
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, updateData] = useState({
        transaction_id: "",
        method: "",
        invoice_number: "",
        timestamp: new Date(),
        amount: "",
        name: "",
        email: "",
        phone_number: "",
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
            transaction_id: "",
            method: "",
            invoice_number: "",
            timestamp: new Date(),
            amount: "",
            name: "",
            email: "",
            phone_number: "",
        });
        getData();
        setID(null);
    };

    const submitData = () => {
        setBtnLoading(true);
        setError("");

        let method = id ? "patch" : "post";
        let url = `payment${id ? "/update/" + id : ""}`;
        let action = id ? "updated" : "created";

        if (id) {
        }

        submitFormData(method, url, data)
            .then(() => {
                enqueueSnackbar(`Payment ${action} successfully`, {
                    variant: "success",
                });
                exitForm();
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

    let disabled =
        data.method === "" ||
        data.timestamp === "" ||
        data.amount === 0 ||
        data.name === "" ||
        data.email === "";

    useEffect(() => {
        if (id) {
            apiRequest(
                "get",
                "payment/" + id,
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
                                {id ? "Update payment" : "Create new payment"}
                            </h3>
                            <div
                                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-600"
                                title="close"
                                onClick={() => {
                                    setRevealForm(false);
                                    updateData({
                                        transaction_id: "",
                                        method: "",
                                        invoice_number: "",
                                        timestamp: "",
                                        amount: "",
                                        name: "",
                                        email: "",
                                        phone_number: "",
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
                                    item="transaction_id"
                                    label="Transaction ID"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                                <Select
                                    item="method"
                                    list={[
                                        { name: "Mpesa", value: "mpesa" },
                                        {
                                            name: "Bank Deposit",
                                            value: "bank deposit",
                                        },
                                        {
                                            name: "Cash",
                                            value: "cash",
                                        },
                                    ]}
                                    data={data}
                                    updateData={updateData}
                                />
                            </div>
                            <Input
                                item="invoice_number"
                                type="text"
                                data={data}
                                updateData={updateData}
                            />
                            <div className="flex space-x-4">
                                <Input
                                    item="timestamp"
                                    label="Time Paid"
                                    type="datetime-local"
                                    data={data}
                                    updateData={updateData}
                                />
                                <Input
                                    item="amount"
                                    label="Amount"
                                    type="number"
                                    data={data}
                                    updateData={updateData}
                                />
                            </div>
                            <Input
                                item="name"
                                type="text"
                                data={data}
                                updateData={updateData}
                            />
                            <div className="flex space-x-4">
                                <Input
                                    item="email"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                                <Input
                                    item="phone_number"
                                    label="Phone Number"
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
