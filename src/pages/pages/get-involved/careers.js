import React, { useState } from "react";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";
import { EnvironmentSection } from "../../../layouts/forms/content/get-involved/environment";
import { AvailableJobsSection } from "../../../layouts/forms/content/get-involved/available-jobs";

export const CareersPage = () => {
    const [data, updateData] = useState([]);

    const content = (
        <div className="space-y-8">
            <EnvironmentSection data={data[0]} />
            <AvailableJobsSection data={data[1]} />
        </div>
    );

    return (
        <ContentPageLayout
            page="careers"
            content={content}
            data={data}
            updateData={updateData}
        />
    );
};
