import { PageLayout } from "../layouts/pageLayout";

const searchQuery = {
    keyword: "",
    status: "",
    page: 1,
    limit: 9,
};
export const SocialPostsPage = () => {
    return <PageLayout page="socialposts" searchQuery={searchQuery} />;
};
