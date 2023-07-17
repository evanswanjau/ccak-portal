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
            { name: "Transaction ID", value: "transaction_id" },
            { name: "Method", value: "method" },
            { name: "Invoice", value: "invoice_number" },
            { name: "Type", value: "type" },
            { name: "Amount", value: "amount" },
            { name: "Timestamp", value: "timestamp" },
        ];

    if (url === "administrators")
        return [
            { name: "Name", value: "name" },
            { name: "Email", value: "email" },
            { name: "Role", value: "role" },
            { name: "Status", value: "status" },
            { name: "Created By", value: "created_by" },
        ];
    
    if (url === "invoices")
        return [
            { name: "Invoice Number", value: "invoice_number" },
            { name: "Total", value: "total_amount" },
            { name: "Paid", value: "paid_amount" },
            { name: "Balance", value: "balance" },
            { name: "Status", value: "status" },
            { name: "Created By", value: "created_by" },
        ];

    if (url === "subscribers")
        return [
            { name: "Email", value: "email" },
            { name: "Created At", value: "created_at" },
        ];
};
