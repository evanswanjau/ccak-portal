import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { HeaderForm } from "../../../layouts/forms/header-form";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";
import { TeamForm } from "../../../layouts/forms/team-form";
import { IoClose } from "react-icons/io5";
import { BtnLoader } from "../../../components/btnLoader";
import { submitFormData } from "../../../api/api-calls";
import { Alert } from "../../../components/forms/alert";
import { HiPencil } from "react-icons/hi2";
import { Loader } from "../../../components/loader";
import { IKContext, IKUpload } from "imagekitio-react";

const CreateTeamForm = ({
    member,
    setMember,
    data,
    updateData,
    setRevealForm,
}) => {
    const [memberData, setMemberData] = useState(
        member ? member : { name: "", position: "", bio: "", image: "" }
    );
    const [btnLoading, setBtnLoading] = useState(false);
    const [pushData, setPushData] = useState([]);
    const [error, setError] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const disabled =
        memberData.name === "" ||
        memberData.position === "" ||
        memberData.groupIndex === "" ||
        memberData.image === "";

    const updateMember = (key, event) => {
        const newArray = JSON.parse(JSON.stringify(data));
        newArray[1]["content"][memberData.groupIndex].members[memberData.index][
            key
        ] = event.target.value;
        setPushData(newArray);
    };

    const addMember = () => {
        const newArray = JSON.parse(JSON.stringify(data));
        newArray[1]["content"][memberData.groupIndex].members.push(memberData);
        setPushData(newArray);
        submitData("create", newArray);
    };

    const deleteMember = () => {
        const newArray = JSON.parse(JSON.stringify(data));
        newArray[1]["content"][memberData.groupIndex].members.splice(
            memberData.index,
            1
        );

        enqueueSnackbar("Item deleted successfully", {
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            },
            autoHideDuration: 5000,
            action: (
                <div>
                    <button
                        className="py-1.5 px-4 mx-1 bg-red-600 rounded hover:bg-stone-900 transition-all ease-in-out"
                        onClick={() => {
                            closeSnackbar();
                        }}
                    >
                        Undo
                    </button>
                </div>
            ),
            onClose: () => {
                setPushData(newArray);
                submitData("delete", newArray);
            },
        });
    };

    const submitData = (action, newData) => {
        const uploadData = newData.length > 0 ? newData : data;
        setBtnLoading(true);
        submitFormData(
            "post",
            `content/update/${uploadData[1].id}`,
            uploadData[1]
        )
            .then(() => {
                updateData(pushData);
                enqueueSnackbar(`Team member ${action}d successfully`, {
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
                setMember(null);
                setRevealForm(false);
                updateData(uploadData);
            });
    };

    return (
        <div className="w-full lg:w-6/12 mx-auto rounded-lg shadow-lg">
            <div className="flex items-center justify-between px-5 py-2 shadow-sm rounded-t-lg">
                <h3 className="text-xl text-gray-600">{memberData.id ? 'Update' : 'Create'} Team Member</h3>
                <div
                    className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-900"
                    title="close"
                    onClick={() => {
                        setMember(null);
                        setRevealForm(false);
                    }}
                >
                    <IoClose className="text-2xl" />
                </div>
            </div>
            <div className="p-5 flex flex-col space-y-4">
                {error && <Alert type="error" message={error} />}

                <div
                    className="relative group w-48 h-48 mx-auto transition-opacity duration-900 cursor-pointer"
                    onClick={() => {
                        if (!("groupIndex" in memberData)) {
                            setError("Please select a category");
                        } else if (memberData.name === "") {
                            setError("Please enter a name");
                        } else {
                            setError("");
                        }
                    }}
                >
                    <div className="cursor-pointer hidden absolute group-hover:block inset-0 bg-black opacity-50 w-48 h-48 rounded-full mx-auto transition-opacity duration-900"></div>
                    <label htmlFor="imageUpload">
                        {imageLoading ? (
                            <Loader />
                        ) : memberData.image ? (
                            <div
                                style={{
                                    backgroundImage: `url(${
                                        process.env.REACT_APP_IMAGEKIT_URL +
                                        "/" +
                                        memberData.image
                                    })`,
                                }}
                                className={`bg-cover bg-center bg-no-repeat text-white w-48 h-48 rounded-full mx-auto`}
                            ></div>
                        ) : (
                            <img
                                className="w-48 h-48 mx-auto"
                                src="/default-pp.jpg"
                                alt="profile pic"
                            />
                        )}
                    </label>

                    <div className="hidden absolute inset-0 group-hover:flex items-center justify-center transition-opacity duration-900">
                        <HiPencil className="w-10 h-10 p-2 text-white cursor-pointer" />
                    </div>
                    {"groupIndex" in memberData && memberData.name && (
                        <IKContext
                            publicKey={
                                process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY
                            }
                            urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL}
                            authenticationEndpoint={
                                process.env.REACT_APP_IMAGEKIT_AUTH
                            }
                        >
                            <IKUpload
                                id="imageUpload"
                                useUniqueFileName={false}
                                overwriteFile={true}
                                fileName={
                                    memberData.name.replace(" ", "-") + ".jpg"
                                }
                                folder={`our_team/${data[1]["content"][
                                    memberData.groupIndex
                                ].name.replace(/ /g, "_")}`}
                                onChange={(event) => {
                                    setImageLoading(true);
                                }}
                                onError={(error) => {
                                    setError(error.message);
                                    setImageLoading(false);
                                }}
                                onSuccess={(response) => {
                                    setMemberData({
                                        ...memberData,
                                        image: response.filePath.substring(1),
                                    });
                                    setImageLoading(false);
                                }}
                                style={{
                                    position: "absolute",
                                    top: "0",
                                    border: "1px solid red",
                                    height: "200px",
                                    width: "200px",
                                    opacity: "0",
                                    cursor: "pointer",
                                }}
                            />
                        </IKContext>
                    )}
                </div>

                <div className="w-full">
                    <label
                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <select
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                        onChange={(event) => {
                            if (memberData.id)
                                updateMember("groupIndex", event);

                            setMemberData({
                                ...memberData,
                                groupIndex: event.target.value,
                            });

                            setError("");
                        }}
                    >
                        <option value={""}>Choose Category</option>
                        {[
                            "executive board members",
                            "board members",
                            "secretariat",
                        ].map((item, i) => {
                            return (
                                <option
                                    key={i}
                                    value={i}
                                    selected={memberData.groupIndex === i}
                                >
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                </div>
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
                        placeholder="Enter name"
                        value={memberData.name}
                        onChange={(event) => {
                            if (memberData.id) updateMember("name", event);
                            setMemberData({
                                ...memberData,
                                name: event.target.value,
                            });
                            setError("");
                        }}
                    />
                </div>
                <div className="w-full">
                    <label
                        className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                        htmlFor="position"
                    >
                        Position
                    </label>
                    <input
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg p-3 leading-tight focus:outline-none focus:border-gray-500"
                        type="text"
                        placeholder="Enter position"
                        value={memberData.position}
                        onChange={(event) => {
                            if (memberData.id) updateMember("position", event);
                            setMemberData({
                                ...memberData,
                                position: event.target.value,
                            });
                        }}
                    />
                </div>
                <label
                    className="block uppercase tracking-wide text-gray-900 text-xs font-bold m1-2"
                    htmlFor="position"
                >
                    Bio
                </label>
                <textarea
                    rows={5}
                    className="block p-2.5 w-full text-sm text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-500"
                    placeholder={`Write bio here...`}
                    value={memberData.bio}
                    onChange={(event) => {
                        if (memberData.id) updateMember("bio", event);
                        setMemberData({
                            ...memberData,
                            bio: event.target.value,
                        });
                    }}
                ></textarea>
                {memberData.id && (
                    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-800 text-white font-medium rounded-lg text-sm pt-3 px-4 pb-[0.8em] transition duration-150 ease-in-out"
                        onClick={() => {
                            deleteMember();
                        }}
                    >
                        {btnLoading ? (
                            <BtnLoader />
                        ) : (
                            <span className="tracking-widest">
                                DELETE TEAM MEMBER
                            </span>
                        )}
                    </button>
                )}
                <button
                    type="button"
                    disabled={disabled || btnLoading}
                    className={` ${
                        disabled || btnLoading
                            ? "bg-gray-100"
                            : " bg-teal-900 hover:bg-teal-950"
                    } text-white font-medium rounded-lg text-sm pt-3 px-4 pb-[0.8em] transition duration-150 ease-in-out`}
                    onClick={() => {
                        if (memberData.id) {
                            submitData("update", pushData);
                        } else {
                            addMember();
                        }
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

export const OurTeamPage = () => {
    const [data, updateData] = useState([]);
    const [member, setMember] = useState(null);
    const [revealForm, setRevealForm] = useState(false);

    const content = (
        <div className="space-y-8">
            {revealForm ? (
                <CreateTeamForm
                    member={member}
                    setMember={setMember}
                    data={data}
                    updateData={updateData}
                    setRevealForm={setRevealForm}
                />
            ) : (
                <>
                    <HeaderForm data={data[0]} />
                    <TeamForm
                        data={data[1]}
                        setMember={setMember}
                        setRevealForm={setRevealForm}
                    />
                </>
            )}
        </div>
    );

    return (
        <ContentPageLayout
            page="our-team"
            content={content}
            data={data}
            updateData={updateData}
            revealForm={revealForm}
            setRevealForm={setRevealForm}
        />
    );
};
