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
    if (method === "post") delete data["id"];

    return axios({
        method: method === "delete" ? "post" : method,
        url: process.env.REACT_APP_API_URL + url,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
        .then(({ data }) => {
            method !== "delete" && updateData(data);
            if (message)
                return enqueueSnackbar(message, {
                    variant: "success",
                });
        })
        .catch(({ response }) => {
            return enqueueSnackbar(
                response.data.message || "Unknown error occurred",
                {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                }
            );
        });
};

export const submitFormData = (method, url, data) => {
    if (method === "patch" && data.password && data.password.length > 30)
        delete data["password"];

    return axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + url,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
};

export const searchData = (
    page,
    search,
    updateData,
    parseData,
    enqueueSnackbar,
    setPaginationData,
    setLoading
) => {
    if (setLoading) setLoading(true);
    return axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}${page}/search${
            search.page > 1 ? "?page=" + search.page : ""
        }`,
        data: search,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
        .then(({ data }) => {
            if (parseData) {
                updateData(parseData(page, data.results));
            } else {
                updateData(data.results ? data.results : data);
            }

            if (setPaginationData) {
                delete data.results;
                setPaginationData(data);
            }
        })
        .catch(({ response }) => {
            return enqueueSnackbar(
                response.data.message || "Unknown error occurred",
                {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                }
            );
        })
        .finally(() => {
            if (setLoading) setLoading(false);
        });
};

export const getListData = (url, parseData, updateData, enqueueSnackbar) => {
    return axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + url,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
        .then(({ data }) => {
            updateData(parseData(url, data));
        })
        .catch(({ response }) => {
            return enqueueSnackbar(response.data.message, {
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
            Authorization: "Bearer " + localStorage.getItem("token"),
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
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
};

export const loginAdministrator = (data, setBtnLoading, setError) => {
    setBtnLoading(true);
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
            window.location.replace("/");
        })
        .catch((error) => {
            setError(
                error.response.data.error ||
                    "Unknown error occurred. Please try again later."
            );
        })
        .finally(() => {
            setBtnLoading(false);
        });
};

export const dashboardStats = (data, updateData, category) => {
    return axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "dashboard/stats/" + category,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    }).then(({ data }) => {
        updateData(data);
    });
};
