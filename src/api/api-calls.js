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

export const searchPosts = (search, updateData, parseData, enqueueSnackbar) => {
    return axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + `search/posts`,
        data: search,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(({ data }) => {
            updateData(parseData("posts", data));
        })
        .catch(({ response }) => {
            let errors = response.data;
            let keys = Object.keys(response.data);

            return enqueueSnackbar(errors[keys[0]][0], {
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

export const loginAdministrator = (data, setBtnLoading, setError) => {
    return axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + `auth/administrator/login`,
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(({ data }) => {
            localStorage.setItem("token", data.access);
            window.location.replace("/posts");
        })
        .catch((error) => {
            setError(error.response.data.error);
        })
        .finally(() => {
            setBtnLoading(false);
        });
};
