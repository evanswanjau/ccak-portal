import React, { useState } from "react";
import { HeaderForm } from "../../../layouts/forms/header-form";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";
import { PackagesSection } from "../../../layouts/forms/content/membership/packages";

export const PackagesPage = () => {
    const [data, updateData] = useState([]);

    const content = (
        <div className="space-y-8">
            <HeaderForm data={data[0]} />
            <PackagesSection data={data[1]} />
        </div>
    );

    return (
        <ContentPageLayout
            page="packages"
            content={content}
            data={data}
            updateData={updateData}
        />
    );
};
