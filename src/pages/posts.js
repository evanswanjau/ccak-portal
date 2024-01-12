import { PageLayout } from "../layouts/pageLayout";

const searchQuery = {
    keyword: "",
    table: "posts",
    category: "",
    project_status: "",
    access: "",
    status: "",
    page: 1,
    limit: 15,
    ip_address: "",
};

export const PostsPage = () => {
    return (
        <PageLayout page="posts" searchQuery={searchQuery} addButton={true} />
    );
};
