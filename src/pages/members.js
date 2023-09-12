import { PageLayout } from "../layouts/pageLayout";

const searchQuery = {
    keyword: "",
    technology: "",
    registration_status: "",
    subscription_status: "",
    subscription_category: "",
    status: "",
    page: 1,
    limit: 100,
};

export const MembersPage = () => {
    return (
        <PageLayout page="members" searchQuery={searchQuery} addButton={true} />
    );
};
