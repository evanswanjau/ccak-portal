import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { HiHeart } from "react-icons/hi2";
import { format } from "date-fns";
import { submitFormData } from "../api/api-calls";

export const SocialHubPost = ({ data }) => {
    const [showText, setShowText] = useState(false);
    const [post, setPost] = useState(data);

    const updateStatus = () => {
        const status = post.status === "active" ? "inactive" : "active";

        submitFormData("post", "/socialpost/update/" + data.id, {
            ...post,
            status,
        }).then(({ data }) => {
            setPost(data);
        });
    };

    return (
        <div className="flex flex-col justify-between shadow-lg rounded-lg pt-4 px-4 group">
            <div className="flex justify-end">
                <button
                    className={`w-fit text-white m-1 text-xs p-1 px-2 z-10 rounded group-hover:opacity-100 transition-opacity duration-200 delay-150 ${
                        post.status === "active" ? "bg-red-600" : "bg-green-600"
                    }`}
                    onClick={() => {
                        updateStatus();
                    }}
                >
                    {post.status === "active" ? "SUSPEND" : "APPROVE"}
                </button>
            </div>
            <div className="flex space-x-4 my-4">
                <img
                    src={`${process.env.REACT_APP_IMAGEKIT_URL}/members/${post.logo}`}
                    alt="member logo"
                    className="h-14 w-auto"
                />
                <div>
                    <p className="text-xl capitalize font-extrabold">
                        {post.author}
                    </p>
                    <p className="text-sm text-gray-500">{post.company}</p>
                </div>
            </div>
            <p
                className={`${!showText && "line-clamp-3"}`}
                onClick={() => {
                    setShowText(!showText);
                }}
            >
                {post.post}
            </p>
            <img
                src={post.image}
                alt={post.post}
                className="rounded-lg my-5 max-h-48 object-cover"
            />
            <div className="flex justify-between mb-2">
                <div className="flex items-center">
                    <p
                        className={`${
                            post.status === "inactive"
                                ? "bg-red-600"
                                : "bg-green-600"
                        } h-2 w-2 mr-1 rounded-full`}
                    ></p>
                    <p className="text-xs">{post.status}</p>
                </div>
                <p className="text-right text-xs text-gray-400">
                    {format(new Date(post.created_at), "do MMM yyyy h:mm a")}
                </p>
            </div>
        </div>
    );
};
