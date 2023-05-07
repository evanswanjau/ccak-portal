import React, { useState } from "react";
import PageLayout from "../layouts/pageLayout";
import { DataTable } from "../components/dataTable";

const Payments = () => {
    const [data, setData] = useState([
        {
            trans_id: "NCWI12343",
            method: "MPESA",
            type: "donation",
            amount: 10000,
            customer_id: "254707837313",
            timestamp: "2023-07-10 08:00AM",
        },
        {
            trans_id: "NCWI12343",
            method: "MPESA",
            type: "donation",
            amount: 10000,
            customer_id: "254707837313",
            timestamp: "2023-07-10 08:00AM",
        },
        {
            trans_id: "NCWI12343",
            method: "MPESA",
            type: "donation",
            amount: 10000,
            customer_id: "254707837313",
            timestamp: "2023-07-10 08:00AM",
        },
        {
            trans_id: "NCWI12343",
            method: "MPESA",
            type: "donation",
            amount: 10000,
            customer_id: "254707837313",
            timestamp: "2023-07-10 08:00AM",
        },
    ]);
    const [loading, setLoading] = useState(false);

    const content = <DataTable />;

    return (
        <PageLayout length={data.length} loading={loading} content={content} />
    );
};

export default Payments;
