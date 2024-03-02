import React, { useState } from "react";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";
import { WhyJoinUsSection } from "../../../layouts/forms/content/membership/why-join-us";

export const RegistrationPage = () => {
    const [data, updateData] = useState([]);

    return (
        <ContentPageLayout
            page="register"
            content={<WhyJoinUsSection data={data[0]} />}
            data={data}
            updateData={updateData}
        />
    );
};
