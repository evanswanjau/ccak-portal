import { PostForm } from "../layouts/forms/post-form";

export const getForm = (url, setRevealForm, id) => {
    if (url === "posts")
        return <PostForm setRevealForm={setRevealForm} id={id} />;
};
