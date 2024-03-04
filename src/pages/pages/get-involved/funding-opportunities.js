import React, { useState } from "react";
import { HeaderForm } from "../../../layouts/forms/header-form";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";

export const FundingOpportunitiesPage = () => {
    const [data, updateData] = useState([]);

    return (
        <ContentPageLayout
            page="funding-opportunities"
            content={<HeaderForm data={data[0]} />}
            data={data}
            updateData={updateData}
        />
    );
};
