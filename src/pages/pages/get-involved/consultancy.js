import React, { useState } from "react";
import { HeaderForm } from "../../../layouts/forms/header-form";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";

export const ConsultancyPage = () => {
    const [data, updateData] = useState([]);

    return (
        <ContentPageLayout
            page="consultancy"
            content={<HeaderForm data={data[0]} />}
            data={data}
            updateData={updateData}
        />
    );
};
