import React, { useState } from "react";
// import { HeaderForm } from "../../../layouts/forms/header-form";
import { ContentPageLayout } from "../../layouts/contentPageLayout";
import { HomeSlider } from "../../layouts/forms/content/home/home-slider";
import { AdvocateSection } from "../../layouts/forms/content/home/advocate";
import { HomeVideo } from "../../layouts/forms/content/home/home-video";
import { WhatWeDoSection } from "../../layouts/forms/content/home/what-we-do";
import { CallToActionSection } from "../../layouts/forms/content/home/call-to-action";
import { ProjectTitleSection } from "../../layouts/forms/content/what-we-do/project-title";
import { AchievementsSection } from "../../layouts/forms/content/home/achievements";

export const HomePage = () => {
    const [data, updateData] = useState([]);

    const content = (
        <div className="space-y-8">
            <HomeSlider data={data[0]} />
            <HomeVideo data={data[1]} />
            <AdvocateSection data={data[2]} />
            <WhatWeDoSection data={data[5]} />
            <AchievementsSection data={data[6]} />
            <ProjectTitleSection data={data[7]} />
            <CallToActionSection data={data[8]} />
        </div>
    );

    return (
        <ContentPageLayout
            page="home"
            content={content}
            data={data}
            updateData={updateData}
        />
    );
};
