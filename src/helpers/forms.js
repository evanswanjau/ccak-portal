import { PostForm } from "../layouts/forms/post-form";

export const getForm = (page, setRevealForm, id, getData) => {
    if (page === "posts")
        return (
            <PostForm setRevealForm={setRevealForm} id={id} getData={getData} />
        );
};
