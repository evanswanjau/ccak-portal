import { PostForm } from "../layouts/forms/post-form";

export const getForm = (url, setRevealForm, id, getData) => {
    if (url === "posts")
        return (
            <PostForm setRevealForm={setRevealForm} id={id} getData={getData} />
        );
};
