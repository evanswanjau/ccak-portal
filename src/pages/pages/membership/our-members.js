import React, { useState } from "react";
import { HeaderForm } from "../../../layouts/forms/header-form";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";

export const OurMembersPage = () => {
    const [data, updateData] = useState([]);

    return (
        <ContentPageLayout
            page="our-members"
            content={<HeaderForm data={data[0]} />}
            data={data}
            updateData={updateData}
        />
    );
};
