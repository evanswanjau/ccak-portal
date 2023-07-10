import { PostForm } from "../layouts/forms/post-form";

export const getForm = (url, setRevealForm, id, getData) => {
    if (url === "search/posts")
        return (
            <PostForm setRevealForm={setRevealForm} id={id} getData={getData} />
        );
};
