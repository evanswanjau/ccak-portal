import { PageLayout } from "../layouts/pageLayout";

const searchQuery = {
    transaction_id: "",
    method: "",
    invoice_number: "",
    page: 1,
    limit: 100,
};

export const PaymentsPage = () => {
    return (
        <PageLayout
            page="payments"
            searchQuery={searchQuery}
            addButton={true}
        />
    );
};
