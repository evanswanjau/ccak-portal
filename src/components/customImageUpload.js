import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { imageUpload } from "../api/api-calls";
import { v4 as uuidv4 } from "uuid";

export const CustomImageUpload = ({
    data,
    updateData,
    ratio,
    folder,
    file_name,
}) => {
    const [preview, setPreview] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const cropperRef = useRef(null);

    const inputId = uuidv4();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleCrop = () => {
        setImageUploading(true);
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;

        const croppedCanvas = cropper.getCroppedCanvas();

        croppedCanvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append("file", blob);
            formData.append("folder", folder);
            formData.append("file_name", file_name);

            imageUpload(formData).then((response) => {
                updateData({ ...data, image: response.data.file_path });
                setPreview(null);
                setImageUploading(false);
                cropperRef.current?.cropper.destroy();
            });
        }, "image/png");
    };

    return (
        <div>
            {preview && (
                <div>
                    <Cropper
                        src={preview}
                        ref={cropperRef}
                        style={{ height: 400, width: "auto" }}
                        aspectRatio={ratio}
                        guides={false}
                        viewMode={1}
                        checkCrossOrigin={false}
                        checkOrientation={false}
                        background={false}
                    />
                    <div className="my-5 flex justify-end space-x-2">
                        <button
                            className="border border-red-500 hover:bg-red-500 text-red-600 hover:text-white font-medium rounded-lg text-sm pt-3 px-4 pb-[0.8em] transition duration-150 ease-in-out"
                            onClick={() => setPreview(null)}
                        >
                            Cancel
                        </button>
                        <button
                            className={`${
                                !imageUploading
                                    ? "bg-teal-900 hover:bg-teal-950"
                                    : "bg-gray-400"
                            }  text-white font-medium rounded-lg text-sm pt-3 px-4 pb-[0.8em] transition duration-150 ease-in-out
                        `}
                            onClick={handleCrop}
                            disabled={imageUploading}
                        >
                            {imageUploading ? "Cropping..." : "Crop Image"}
                        </button>
                    </div>
                </div>
            )}
            {data.image && !preview && (
                <div>
                    <img
                        className="h-[400px] w-auto mx-auto rounded-lg"
                        src={
                            process.env.REACT_APP_IMAGEKIT_URL +
                            "/" +
                            data.image
                        }
                        alt="Preview"
                    />
                    <div className="flex flex-col items-center mb-5 justify-center">
                        <input
                            id={inputId}
                            className="opacity-0"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 w-fit text-white font-medium rounded-lg text-sm pt-3 px-4 pb-[0.8em] transition duration-150 ease-in-out"
                            onClick={() => {
                                document.getElementById(inputId).click();
                            }}
                        >
                            Upload New Image
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
