import { PostForm } from "../layouts/forms/post-form";

export const getForm = (url, setRevealForm) => {
    if (url === "posts") return <PostForm setRevealForm={setRevealForm} />;
};
