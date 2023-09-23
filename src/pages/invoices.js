import { PageLayout } from "../layouts/pageLayout";

const searchQuery = {
    keyword: "",
    member_id: "",
    type: "",
    status: "",
    page: 1,
    limit: 10,
};

export const InvoicesPage = () => {
    return (
        <PageLayout
            page="invoices"
            searchQuery={searchQuery}
            addButton={false}
        />
    );
};
