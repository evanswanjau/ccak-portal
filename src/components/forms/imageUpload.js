import { useSnackbar } from "notistack";
import { IoCloudUpload } from "react-icons/io5";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { useState } from "react";
import { Loader } from "../loader";

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
            <div className="h-full border-2 flex flex-col  items-center justify-center  cursor-pointer text-gray-400 border-gray-300 rounded-lg border-dashed">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <label htmlFor="image">
                            <div className="flex flex-col  items-center justify-center">
                                {data.image !== "" ? (
                                    <IKImage
                                        className="object-cover rounded-lg"
                                        urlEndpoint={
                                            process.env.REACT_APP_IMAGEKIT_URL
                                        }
                                        path={`${data.folder}/${data.image}`}
                                    />
                                ) : (
                                    <>
                                        <IoCloudUpload className="text-6xl" />
                                        <p className="mt-5">
                                            Drag and drop or browse to choose
                                            file
                                        </p>
                                    </>
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
