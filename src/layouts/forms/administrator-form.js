import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { apiRequest } from "../../api/api-calls";
import { Loader } from "../../components/loader";
import { Input } from "../../components/forms/input";
import { BtnLoader } from "../../components/btnLoader";

export const AdministratorForm = ({ setRevealForm, id, getData }) => {
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [data, updateData] = useState({
        transaction_id: "",
        invoice_number: "",
        timestamp: new Date(),
        amount: "",
    });

    const { enqueueSnackbar } = useSnackbar();

    // const submitData = (method, url, data, message = null) => {
    //     return apiRequest(
    //         method,
    //         url,
    //         data,
    //         updateData,
    //         enqueueSnackbar,
    //         message
    //     );
    // };

    // const exit = () => {
    //     if (data.step !== "category") {
    //         submitData("patch", "post/" + data.id, data);
    //     }

    //     getData();
    //     setRevealForm(false);
    // };

    let disabled = false;

    useEffect(() => {
        if (id) {
            apiRequest(
                "get",
                "post/" + id,
                data,
                updateData,
                enqueueSnackbar
            ).then(() => {
                setLoading(false);
            });
        } else {
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
                    <div className="w-7/12 mx-auto p-5 rounded-lg shadow-lg">
                        <div className="flex space-x-4">
                            <Input
                                item="first_name"
                                label="First Name"
                                type="text"
                                data={data}
                                onChange={updateData}
                            />
                            <Input
                                item="last_name"
                                label="Last Name"
                                type="text"
                                data={data}
                                onChange={updateData}
                            />
                        </div>

                        <Input
                            item="email"
                            label="Email"
                            type="text"
                            data={data}
                            onChange={updateData}
                        />
                        <Input
                            item="password"
                            label="Password"
                            type="text"
                            data={data}
                            onChange={updateData}
                        />
                        <button
                            type="button"
                            disabled={disabled}
                            className={` ${
                                disabled
                                    ? "bg-gray-100"
                                    : " bg-teal-900 hover:bg-teal-950"
                            } w-full text-white font-medium rounded-lg text-sm pt-3 pb-[1em] transition duration-150 ease-in-out`}
                            onClick={() => {
                                // login();
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
        </div>
    );
};
