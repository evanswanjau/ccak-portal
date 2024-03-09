import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { submitFormData } from "../../../../api/api-calls";
import { Alert } from "../../../../components/forms/alert";
import { Carousel } from "../../../../components/carousel";
import { BtnLoader } from "../../../../components/btnLoader";

export const PackagesSection = ({ data }) => {
    const [content, updateContent] = useState(data?.content);
    const [showForm, setShowForm] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [error, setError] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const disabled = content.some(
        (item) =>
            item.name === "" ||
            item.category === "" ||
            item.price === "" ||
            item.list.some((requirement) => requirement === "")
    );

    const updateItem = (index, key, event) => {
        const newArray = [...content];
        newArray[index][key] = event.target.value;
        updateContent(newArray);
    };

    const updateList = (index, i, event) => {
        const newArray = [...content];
        newArray[index]["list"][i] = event.target.value;
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
                            "Unable to submit, please check your connection and try again"
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
                <h2 className="text-xl font-semibold">Packages</h2>
                {showForm ? (
                    <HiMinus className="text-xl text-white" />
                ) : (
                    <HiPlus className="text-xl text-white" />
                )}
            </div>

            {showForm && (
                <div className="p-5">
                    {error && <Alert type="error" message={error} />}
                    <div className="flex flex-col space-y-4 ">
                        {content.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col space-y-4 p-8 border border-teal-900 rounded-lg"
                            >
                                <h1 className="flex flex-col font-lg font-semibold">
                                    PACKAGE {i + 1}
                                </h1>
                                <div className="w-full">
                                    <label
                                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                        type="text"
                                        placeholder="Enter package name"
                                        value={item.name}
                                        onChange={(event) => {
                                            updateItem(i, "name", event);
                                        }}
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                        htmlFor="category"
                                    >
                                        Category
                                    </label>
                                    <input
                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                        type="text"
                                        placeholder="Enter category"
                                        value={item.category}
                                        onChange={(event) => {
                                            updateItem(i, "category", event);
                                        }}
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                        htmlFor="price"
                                    >
                                        Price
                                    </label>
                                    <input
                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                        type="number"
                                        placeholder="Enter package price"
                                        value={item.price}
                                        onChange={(event) => {
                                            updateItem(i, "price", event);
                                        }}
                                    />
                                </div>
                                <Carousel
                                    items={item?.list.map(
                                        (requirement, index) => (
                                            <div
                                                key={index}
                                                className="flex space-y-4 p-8"
                                            >
                                                <h1 className="font-lg font-semibold">
                                                    REQUIREMENT {index + 1}
                                                </h1>
                                                <div className="w-full">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                                                        htmlFor="price"
                                                    >
                                                        Item {index + 1}
                                                    </label>
                                                    <input
                                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                                                        type="text"
                                                        placeholder="Enter package price"
                                                        value={requirement}
                                                        onChange={(event) => {
                                                            updateList(
                                                                i,
                                                                index,
                                                                event
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                    slides={1}
                                    show={1}
                                    reverse={false}
                                />
                                <button
                                    type="button"
                                    disabled={disabled || btnLoading}
                                    className={` ${
                                        disabled || btnLoading
                                            ? "bg-gray-100"
                                            : " bg-teal-900 hover:bg-teal-950"
                                    } w-fit text-white font-medium rounded-lg text-sm pt-3 px-4 pb-[0.8em] transition duration-150 ease-in-out`}
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
