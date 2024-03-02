import React, { useState } from "react";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";
import { DonateTodaySection } from "../../../layouts/forms/content/get-involved/donate-today";
import { DonateContentSection } from "../../../layouts/forms/content/get-involved/donate-content";
import { SpendDonationsSection } from "../../../layouts/forms/content/get-involved/spend-donations";

export const DontatePage = () => {
    const [data, updateData] = useState([]);

    const content = (
        <div className="space-y-8">
            <DonateTodaySection data={data[0]} />
            <DonateContentSection data={data[1]} />
            <SpendDonationsSection data={data[2]} />
        </div>
    );

    return (
        <ContentPageLayout
            page="donate"
            content={content}
            data={data}
            updateData={updateData}
        />
    );
};
