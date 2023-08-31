import { useState } from "react";
import { useSnackbar } from "notistack";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { Loader } from "../loader";
import { IoCloudUpload, IoCloseCircle } from "react-icons/io5";

export const ImageUpload = ({ data, updateData }) => {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const onError = ({ message }) => {
        enqueueSnackbar(message, {
            variant: "error",
        });
        setLoading(false);
    };

    const onSuccess = (response) => {
        updateData({ ...data, image: response.name });
        setLoading(false);
    };

    return (
        <div className="h-full">
            <div className="h-full border-2 flex flex-col items-center justify-center text-gray-400 border-gray-300 rounded-lg border-dashed">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <label htmlFor="image">
                            <div
                                className={`${
                                    data.category === "careers" ||
                                    data.category === "consultancy" ||
                                    data.category === "funding-opportunities" ||
                                    data.category === "internal-publications" ||
                                    data.category === "newsletters"
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                } `}
                            >
                                {data.image !== "" ? (
                                    <IKImage
                                        className="object-cover rounded-lg"
                                        urlEndpoint={
                                            process.env.REACT_APP_IMAGEKIT_URL
                                        }
                                        path={`${data.folder}/${data.image}`}
                                    />
                                ) : (
                                    <div className="px-20 py-24 flex flex-col items-center justify-center">
                                        {data.category === "careers" ||
                                        data.category === "consultancy" ||
                                        data.category ===
                                            "funding-opportunities" ||
                                        data.category ===
                                            "internal-publications" ||
                                        data.category === "newsletters" ? (
                                            <>
                                                <IoCloseCircle className="text-6xl" />
                                                <p className="mt-5">
                                                    Image not required
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <IoCloudUpload className="text-6xl" />
                                                <p className="mt-5">
                                                    Drag and drop or browse to
                                                    choose file
                                                </p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </label>
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
                                id="image"
                                className="hidden"
                                fileName={data.title + ".jpg"}
                                useUniqueFileName={true}
                                folder={data.folder}
                                disabled={
                                    data.category === "careers" ||
                                    data.category === "consultancy" ||
                                    data.category === "funding-opportunities" ||
                                    data.category === "internal-publications" ||
                                    data.category === "newsletters"
                                }
                                onChange={() => {
                                    setLoading(true);
                                }}
                                onError={(error) => {
                                    onError(error);
                                }}
                                onSuccess={(response) => {
                                    onSuccess(response);
                                }}
                            />
                        </IKContext>
                    </>
                )}
            </div>
        </div>
    );
};
