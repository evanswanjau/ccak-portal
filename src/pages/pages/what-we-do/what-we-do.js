import React, { useState } from "react";
// import { HeaderForm } from "../../../layouts/forms/header-form";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";
import { CallToActionSection } from "../../../layouts/forms/content/what-we-do/call-to-action";
import { CollaboratingSection } from "../../../layouts/forms/content/what-we-do/collaborating";
import { WhatWeDoSection } from "../../../layouts/forms/content/what-we-do/what-we-do";
import { ProjectTitleSection } from "../../../layouts/forms/content/what-we-do/project-title";

export const WhatWeDoPage = () => {
    const [data, updateData] = useState([]);

    const content = (
        <div className="space-y-8">
            <CollaboratingSection data={data[0]} />
            <WhatWeDoSection data={data[1]} />
            <ProjectTitleSection data={data[2]} />
            <CallToActionSection data={data[3]} />
        </div>
    );

    return (
        <ContentPageLayout
            page="what-we-do"
            content={content}
            data={data}
            updateData={updateData}
        />
    );
};
