import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { apiRequest, submitFormData } from "../../api/api-calls";
import { Loader } from "../../components/loader";
import { Input } from "../../components/forms/input";
import { BtnLoader } from "../../components/btnLoader";
import { IoClose, IoCloudUpload } from "react-icons/io5";
import { Toggle } from "../../components/forms/toggle";
import { Alert } from "../../components/forms/alert";
import { Select } from "../../components/forms/select";
import { TextArea } from "../../components/forms/textarea";

export const MemberForm = ({ setRevealForm, id, getData, setID }) => {
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const [data, updateData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        company: "",
        designation: "",
        bio: "",
        technology: "",
        company_email: "",
        company_phone: "",
        location: "",
        postal_address: "",
        website_link: "",
        logo: "default.png",
        registration_status: "unregistered",
        subscription_status: "inactive",
        status: "active",
        data_from: "portal",
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
            phone_number:"",
            password: "",
            company: "",
            designation: "",
            bio: "",
            technology: "",
            company_email: "",
            company_phone: "",
            location: "",
            postal_address: "",
            website_link: "",
            logo: "default.png",
            registration_status: "unregistered",
            subscription_status: "inactive",
            subscription_category: "category",
            status: "active",
        });
        getData();
        setID(null);
    };

    const onError = ({ message }) => {
        enqueueSnackbar(message, {
            variant: "error",
        });
        setImageLoading(false);
    };

    const onSuccess = (response) => {
        updateData({ ...data, logo: response.name });
        setImageLoading(false);
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
        data.first_name === "" ||
        data.last_name === "" ||
        data.email === "" ||
        data.phone_number === "";

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
                            <div className="relative flex py-5 items-center">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink mx-4 text-gray-400">
                                    Company
                                </span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>
                            <TextArea
                                item="bio"
                                data={data}
                                updateData={updateData}
                            />
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
                            <div className="flex space-x-4">
                                <Input
                                    item="company_email"
                                    label="Company Email (Optional)"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                                <Input
                                    item="company_phone"
                                    label="Company Phone (Optional)"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                            </div>
                            <div className="flex space-x-4">
                                <Input
                                    item="location"
                                    label="Location (Optional)"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                                <Input
                                    item="postal_address"
                                    label="Postal Address (Optional)"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                            </div>
                            <div className="flex space-x-4">
                                <Select
                                    item="technology"
                                    list={[
                                        {
                                            name: "Cook Stoves Providers",
                                            value: "cook stoves providers",
                                        },
                                        { name: "Ethanol", value: "ethanol" },
                                        { name: "Biogas", value: "biogas" },
                                        {
                                            name: "Non-Carbonized Briquettes",
                                            value: "non-carbonized briquettes",
                                        },
                                        {
                                            name: "Carbon Briquettes",
                                            value: "carbon briquettes",
                                        },
                                        {
                                            name: "Research and Consultancy",
                                            value: "research and consultancy",
                                        },
                                        { name: "LPG", value: "lpg" },
                                        { name: "Partners", value: "partners" },
                                        {
                                            name: "Membership Associations",
                                            value: "membership associations",
                                        },
                                        { name: "Solar", value: "solar" },
                                        {
                                            name: "Journalists",
                                            value: "journalists",
                                        },
                                        { name: "IMC", value: "imc" },
                                    ]}
                                    data={data}
                                    updateData={updateData}
                                />
                                <Input
                                    item="website_link"
                                    label="Website Link"
                                    type="text"
                                    data={data}
                                    updateData={updateData}
                                />
                            </div>
                            <h3 className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2">
                                COMPANY LOGO
                            </h3>
                            <div className="flex space-x-4 items-center">
                                <div className="w-2/12">
                                    <IKImage
                                        className="object-cover rounded-lg w-full h-auto"
                                        urlEndpoint={
                                            process.env.REACT_APP_IMAGEKIT_URL
                                        }
                                        path={`members/${data.logo}`}
                                    />
                                </div>
                                <div className="w-10/12">
                                    <label htmlFor="image">
                                        <div className="cursor-pointer border-2 rounded-lg border-dashed">
                                            <div className="px-14 py-16 flex flex-col items-center justify-center">
                                                {imageLoading ? (
                                                    <Loader />
                                                ) : (
                                                    <>
                                                        <IoCloudUpload className="text-5xl" />
                                                        <p className="mt-5">
                                                            Drag and drop or
                                                            browse to choose
                                                            file
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </label>
                                    <IKContext
                                        publicKey={
                                            process.env
                                                .REACT_APP_IMAGEKIT_PUBLIC_KEY
                                        }
                                        urlEndpoint={
                                            process.env.REACT_APP_IMAGEKIT_URL
                                        }
                                        authenticationEndpoint={
                                            process.env.REACT_APP_IMAGEKIT_AUTH
                                        }
                                    >
                                        <IKUpload
                                            id="image"
                                            className="hidden"
                                            fileName={data.title + ".jpg"}
                                            useUniqueFileName={true}
                                            folder="members"
                                            onChange={() => {
                                                setImageLoading(true);
                                            }}
                                            onError={(error) => {
                                                onError(error);
                                            }}
                                            onSuccess={(response) => {
                                                onSuccess(response);
                                            }}
                                        />
                                    </IKContext>
                                </div>
                            </div>
                            <div className="relative flex py-10 items-center">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink mx-4 text-gray-400">
                                    Subscription
                                </span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>
                            <Input
                                item="membership_no"
                                label="Membership Number"
                                type="text"
                                data={data}
                                updateData={updateData}
                            />
                            <Select
                                item="subscription_category"
                                list={[
                                    {
                                        name: "Corporate Large",
                                        value: "corporate-large",
                                    },
                                    {
                                        name: "Corporate Medium",
                                        value: "corporate-medium",
                                    },
                                    {
                                        name: "Corporate Small",
                                        value: "corporate-small",
                                    },
                                    {
                                        name: "Corporate Micro",
                                        value: "corporate-micro",
                                    },
                                    {
                                        name: "NGO International",
                                        value: "ngo-international",
                                    },
                                    { name: "NGO Local", value: "ngo-local" },
                                    {
                                        name: "Donor Large",
                                        value: "donor-large",
                                    },
                                    {
                                        name: "Associaion Membership",
                                        value: "association-membership",
                                    },
                                    {
                                        name: "CSO",
                                        value: "CSO",
                                    },
                                    {
                                        name: "Intitution Research, Technology",
                                        value: "intitution-research,technology",
                                    },
                                    {
                                        name: "Individual",
                                        value: "individual",
                                    },
                                    {
                                        name: "Student",
                                        value: "student",
                                    },
                                ]}
                                data={data}
                                updateData={updateData}
                            />
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
