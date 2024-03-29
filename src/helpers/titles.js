export const getTitles = (url) => {
    if (url === "posts")
        return [
            { name: "Title", value: "title" },
            { name: "Category", value: "category" },
            { name: "Access", value: "access" },
            { name: "Views", value: "views" },
            { name: "Status", value: "status" },
            { name: "Author", value: "author" },
        ];

    if (url === "payments")
        return [
            { name: "Transaction ID", value: "transaction_id" },
            { name: "Invoice", value: "invoice_number" },
            { name: "Method", value: "method" },
            { name: "Name", value: "name" },
            { name: "Phone", value: "phone_number" },
            { name: "Amount", value: "amount" },
            { name: "Timestamp", value: "timestamp" },
        ];

    if (url === "administrators")
        return [
            { name: "Name", value: "name" },
            { name: "Email", value: "email" },
            { name: "Role", value: "role" },
            { name: "Status", value: "status" },
            { name: "Created By", value: "author" },
        ];

    if (url === "invoices")
        return [
            { name: "Invoice Number", value: "invoice_number" },
            { name: "Description", value: "description" },
            { name: "Name", value: "name" },
            { name: "Phone", value: "phone" },
            { name: "Total", value: "total_amount" },
            { name: "Paid", value: "paid_amount" },
            { name: "Balance", value: "balance" },
            { name: "Status", value: "status" },
        ];

    if (url === "subscribers")
        return [
            { name: "Email", value: "email" },
            { name: "Created At", value: "created_at" },
        ];

    if (url === "members")
        return [
            { name: "Name", value: "name" },
            { name: "Company", value: "company" },
            { name: "Designation", value: "designation" },
            { name: "Technology", value: "technology" },
            { name: "Package", value: "subscription_category" },
            { name: "Registration", value: "registration_status" },
            { name: "Subscription", value: "subscription_status" },
        ];

    if (url === "donations")
        return [
            { name: "Name", value: "name" },
            { name: "Phone", value: "phone_number" },
            { name: "Company", value: "company" },
            { name: "Designation", value: "designation" },
            { name: "Amount", value: "amount" },
            { name: "Invoice", value: "invoice_number" },
            { name: "Status", value: "status" },
        ];
};
