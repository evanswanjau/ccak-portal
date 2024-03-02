import React from "react";
import { Input } from "../../../components/forms/input";
import { TextArea } from "../../../components/forms/textarea";
import { BtnLoader } from "../../../components/btnLoader";

export const Editor = ({
    data,
    updateData,
    submitData,
    disabled,
    btnLoading,
    custom,
}) => {
    return (
        <div>
            {"title" in data && (
                <Input
                    item="title"
                    label="Title"
                    type="text"
                    data={data}
                    updateData={updateData}
                />
            )}

            {"sub-title" in data && (
                <TextArea
                    item="sub-title"
                    data={data}
                    updateData={updateData}
                />
            )}

            {"content" in data && !Array.isArray(data.content) && (
                <TextArea item="content" data={data} updateData={updateData} />
            )}
            {custom && <div className="mb-5">{custom}</div>}
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
    );
};
