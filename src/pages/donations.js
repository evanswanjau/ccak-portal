import { PageLayout } from "../layouts/pageLayout";

const searchQuery = {
    keyword: "",
    status: "",
    page: 1,
    limit: 100,
};

export const DonationsPage = () => {
    return (
        <PageLayout
            page="donations"
            searchQuery={searchQuery}
            addButton={true}
        />
    );
};
