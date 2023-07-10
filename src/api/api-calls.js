import axios from "axios";

export const apiRequest = (
    method,
    url,
    data,
    updateData,
    enqueueSnackbar,
    message
) => {
    if (method === "patch") delete data["id"];

    return axios({
        method: method,
        url: process.env.REACT_APP_API_URL + url,
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(({ data }) => {
            method !== "delete" && updateData(data);
            if (message)
                return enqueueSnackbar(message, {
                    variant: "success",
                });
        })
        .catch((error) => {
            return enqueueSnackbar(error.message, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
            });
        });
};

export const searchPosts = (data, updateData, enqueueSnackbar) => {
    return axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + `/search/posts`,
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(({ data }) => {
            updateData(data);
        })
        .catch((error) => {
            return enqueueSnackbar(error.message, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
            });
        });
};

export const imageUpload = (formData) => {
    return axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "imagekit/upload",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const imageDelete = (data) => {
    return axios({
        method: "delete",
        url: process.env.REACT_APP_API_URL + "imagekit/delete",
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
