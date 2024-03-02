import React, { useState } from "react";
// import { HeaderForm } from "../../../layouts/forms/header-form";
import { ContentPageLayout } from "../../../layouts/contentPageLayout";
import { IntroSection } from "../../../layouts/forms/content/about-us/intro";
import { AboutVideo } from "../../../layouts/forms/content/about-us/about-video";
import { MissionVisionSection } from "../../../layouts/forms/content/about-us/mission-vision";
import { AboutUsSection } from "../../../layouts/forms/content/about-us/about-us";
import { CleanCookingSection } from "../../../layouts/forms/content/about-us/clean-cooking-importance";
import { StrategicPillarsSection } from "../../../layouts/forms/content/about-us/pillars";
import { CallToActionSection } from "../../../layouts/forms/content/about-us/call-to-action";

export const AboutUsPage = () => {
    const [data, updateData] = useState([]);

    const content = (
        <div className="space-y-8">
            <IntroSection data={data[0]} />
            <AboutVideo data={data[1]} />
            <MissionVisionSection data={data[2]} />
            <AboutUsSection data={data[5]} />
            <CleanCookingSection data={data[6]} />
            <StrategicPillarsSection data={data[7]} />
            <CallToActionSection data={data[8]} />
        </div>
    );

    return (
        <ContentPageLayout
            page="about-us"
            content={content}
            data={data}
            updateData={updateData}
        />
    );
};
