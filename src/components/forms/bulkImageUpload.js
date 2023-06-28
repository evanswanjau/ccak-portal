import { useState } from "react";
import { useSnackbar } from "notistack";
import { IoCloudUpload } from "react-icons/io5";
import { IKImage } from "imagekitio-react";
import { Loader } from "../loader";
import { imageUpload, imageDelete } from "../../api/api-calls";
import { HiTrash } from "react-icons/hi2";

export const BuilkImageUpload = ({ data, updateData }) => {
    const [loading, setLoading] = useState(false);
    const [upload, setUpload] = useState(false);
    const [totalFiles, setTotalFiles] = useState(0);
    const [uploaded, setUploaded] = useState(0);

    const { enqueueSnackbar } = useSnackbar();

    const uploadImage = (formData, images) => {
        return imageUpload(formData)
            .then(({ data }) => {
                images.push(data);
                setUploaded(images.length);
            })
            .catch(({ response }) => {
                let errors = response.data;
                let keys = Object.keys(response.data);

                enqueueSnackbar(errors[keys[0]][0], {
                    variant: "error",
                });
            })
            .finally(() => {
                updateData({
                    ...data,
                    files: { data: images },
                    image: images[0].name,
                });
            });
    };

    const deleteImage = (file_id) => {
        return imageDelete({ file_id: file_id })
            .then(({ data }) => {
                enqueueSnackbar("Image delete successfully", {
                    variant: "success",
                });
                // TODO: SET DATA TO NEW IMAGES
            })
            .catch(({ response }) => {
                let errors = response.data;

                enqueueSnackbar(errors.error, {
                    variant: "error",
                });
            });
    };

    const imageProcessing = (files) => {
        setLoading(true);
        setUploaded(0);

        let images = data.files.data;

        setTotalFiles(files.length);

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const fileSize = files[i].size / 1024 / 1024;

                if (
                    !files[i] ||
                    !files[i].name
                        .toLowerCase()
                        .match(/\.(jpg|jpeg|png|gif|pdf)$/)
                ) {
                    enqueueSnackbar("File type not allowed", {
                        variant: "error",
                    });
                } else if (fileSize > 5) {
                    enqueueSnackbar("File size exceeds 5 MB", {
                        variant: "error",
                    });
                } else {
                    var formData = new FormData();
                    formData.append("file", files[i]);
                    formData.append("file_name", files[i].name);
                    formData.append("folder", data.folder);

                    uploadImage(formData, images).then(() => {
                        if (files.length - 1 === i) {
                            setLoading(false);
                            setUpload(false);
                        }
                    });
                }
            }
        } else {
            enqueueSnackbar("You have not picked a file", {
                variant: "error",
            });
        }
    };

    return (
        <div className="h-full">
            <div className="">
                {loading ? (
                    <div className="py-24 flex flex-col items-center">
                        <Loader />
                        <p className="text-gray-400 mt-5">
                            Uploading ... ({uploaded}/{totalFiles})
                        </p>
                    </div>
                ) : (
                    <>
                        {data.files.data.length > 0 && (
                            <button
                                type="button"
                                className={`flex focus:outline-none ${
                                    upload
                                        ? "bg-red-400 hover:bg-red-600"
                                        : "bg-teal-900 hover:bg-teal-950"
                                }  text-white font-medium rounded-lg text-sm px-4 pt-2 pb-[0.8em] my-5 transition duration-150 ease-in-out`}
                                onClick={() => {
                                    setUpload(!upload);
                                }}
                            >
                                {upload
                                    ? "Cancel uploading"
                                    : "Upload more images"}
                            </button>
                        )}

                        {(data.files.data.length < 1 || upload) && (
                            <div className="h-full border-2 flex flex-col items-center justify-center mb-5 cursor-pointer text-gray-400 border-gray-300 rounded-lg border-dashed">
                                <label
                                    htmlFor="image"
                                    className="flex flex-col items-center justify-center w-full py-24"
                                >
                                    {data.image !== "" ? (
                                        <IKImage
                                            className="object-cover rounded-lg"
                                            urlEndpoint={
                                                process.env
                                                    .REACT_APP_IMAGEKIT_URL
                                            }
                                            path={`${data.folder}/${data.image}`}
                                        />
                                    ) : (
                                        <>
                                            <IoCloudUpload className="text-6xl" />
                                            <p className="mt-5">
                                                Drag and drop files or browse to
                                                choose files
                                            </p>
                                        </>
                                    )}
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => {
                                        imageProcessing(e.target.files);
                                    }}
                                />
                            </div>
                        )}

                        {data.files.data.length > 0 && (
                            <>
                                <div className="grid grid-cols-5 gap-2">
                                    {data.files.data.map((image, i) => {
                                        return (
                                            <div
                                                className="group transition-all duration-600 ease-in-out"
                                                key={i}
                                            >
                                                <IKImage
                                                    className="rounded-lg"
                                                    urlEndpoint={
                                                        process.env
                                                            .REACT_APP_IMAGEKIT_URL
                                                    }
                                                    transformation={[
                                                        {
                                                            height: 200,
                                                            width: 200,
                                                        },
                                                    ]}
                                                    path={`${data.folder}/${image.name}`}
                                                    height="200"
                                                    width="200"
                                                />
                                                <div className="hidden group-hover:flex justify-end -mt-12 mr-1 transition-all duration-600 ease-in-out">
                                                    <div
                                                        className="bg-white hover:bg-red-600 hover:text-white p-3 shadow-lg rounded-full cursor-pointer"
                                                        onClick={() => {
                                                            deleteImage(
                                                                image.file_id
                                                            );
                                                        }}
                                                    >
                                                        <HiTrash className="text-xl" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
