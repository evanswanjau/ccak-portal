export const getTitles = (url) => {
    if (url === "posts")
        return [
            { name: "Title", value: "title" },
            { name: "Category", value: "category" },
            { name: "Access", value: "access" },
            { name: "Views", value: "views" },
            { name: "Status", value: "status" },
            { name: "Author", value: "created_by" },
        ];

    if (url === "payments")
        return [
            { name: "Transaction ID", value: "trans_id" },
            { name: "Method", value: "method" },
            { name: "Type", value: "type" },
            { name: "Amount", value: "amount" },
            { name: "Customer ID", value: "customer_id" },
            { name: "Timestamp", value: "timestamp" },
        ];
};
