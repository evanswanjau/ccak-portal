import React, { useState } from "react";
import { HeaderForm } from "../../../layouts/forms/header-form";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";

export const InternalPublicationsPage = () => {
    const [data, updateData] = useState([]);

    return (
        <ContentPageLayout
            page="internal-publications"
            content={<HeaderForm data={data[0]} />}
            data={data}
            updateData={updateData}
        />
    );
};
