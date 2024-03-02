import React, { useState } from "react";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";
import { ContactUsSection } from "../../../layouts/forms/content/get-involved/contact-us";

export const ContactUsPage = () => {
    const [data, updateData] = useState([]);

    const content = (
        <div className="space-y-8">
            <ContactUsSection data={data[0]} />
        </div>
    );

    return (
        <ContentPageLayout
            page="contact-us"
            content={content}
            data={data}
            updateData={updateData}
        />
    );
};
