import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TopNav from "./components/topNav";
import { PostsPage } from "./pages/posts";
import { Login } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";
import { PaymentsPage } from "./pages/payments";
import { AdministratorsPage } from "./pages/administrators";
import { InvoicesPage } from "./pages/invoices";
import { SubscribersPage } from "./pages/subscribers";
import { MembersPage } from "./pages/members";
import { MyAccount } from "./pages/myaccount";
import { DonationsPage } from "./pages/donations";
import { SocialPostsPage } from "./pages/socialposts";
import { PressReleasePage } from "./pages/pages/media-centre/press-release";
import { EventsPage } from "./pages/pages/media-centre/events";
import { BlogPage } from "./pages/pages/media-centre/blog";
import { NewsPage } from "./pages/pages/media-centre/news";
import { PhotoGalleryPage } from "./pages/pages/media-centre/photo-gallery";
import { InternalPublicationsPage } from "./pages/pages/resource-centre/internal-publications";
import { ExternalPublicationsPage } from "./pages/pages/resource-centre/external-publications";
import { NewslettersPage } from "./pages/pages/resource-centre/newsletters";
import { ConsultancyPage } from "./pages/pages/get-involved/consultancy";
import { FundingOpportunitiesPage } from "./pages/pages/get-involved/funding-opportunities";
import { OurTeamPage } from "./pages/pages/who-we-are/our-team";
import { HomePage } from "./pages/pages/home";
import { ProjectsPage } from "./pages/pages/what-we-do/projects";
import { AboutUsPage } from "./pages/pages/who-we-are/about-us";
import { WhatWeDoPage } from "./pages/pages/what-we-do/what-we-do";
import { CareersPage } from "./pages/pages/get-involved/careers";
import { DontatePage } from "./pages/pages/get-involved/donate";
import { PackagesPage } from "./pages/pages/membership/packages";
import { OurMembersPage } from "./pages/pages/membership/our-members";
import { RegistrationPage } from "./pages/pages/membership/register";
import { ContactUsPage } from "./pages/pages/get-involved/contact-us";

const App = () => {
    return (
        <Router>
            {window.location.pathname !== "/login" && <TopNav />}

            <Switch>
                <Route
                    exact
                    path="/pages/media-centre/press-release"
                    component={PressReleasePage}
                />
                <Route
                    exact
                    path="/pages/media-centre/events"
                    component={EventsPage}
                />
                <Route
                    exact
                    path="/pages/media-centre/blog"
                    component={BlogPage}
                />
                <Route
                    exact
                    path="/pages/media-centre/news"
                    component={NewsPage}
                />
                <Route
                    exact
                    path="/pages/media-centre/photo-gallery"
                    component={PhotoGalleryPage}
                />
                <Route
                    exact
                    path="/pages/resource-centre/internal-publications"
                    component={InternalPublicationsPage}
                />
                <Route
                    exact
                    path="/pages/resource-centre/external-publications"
                    component={ExternalPublicationsPage}
                />
                <Route
                    exact
                    path="/pages/resource-centre/newsletters"
                    component={NewslettersPage}
                />
                <Route
                    exact
                    path="/pages/membership/packages"
                    component={PackagesPage}
                />
                <Route
                    exact
                    path="/pages/membership/our-members"
                    component={OurMembersPage}
                />
                <Route
                    exact
                    path="/pages/membership/registration"
                    component={RegistrationPage}
                />
                <Route
                    exact
                    path="/pages/get-involved/careers"
                    component={CareersPage}
                />
                <Route
                    exact
                    path="/pages/get-involved/consultancy"
                    component={ConsultancyPage}
                />
                <Route
                    exact
                    path="/pages/get-involved/funding-opportunities"
                    component={FundingOpportunitiesPage}
                />
                <Route
                    exact
                    path="/pages/get-involved/donate"
                    component={DontatePage}
                />
                <Route
                    exact
                    path="/pages/get-involved/contact-us"
                    component={ContactUsPage}
                />
                <WhatWeDoPage exact path="/pages/what-we-do" />
                <ProjectsPage exact path="/pages/what-we-do/projects" />
                <Route
                    exact
                    path="/pages/who-we-are/our-team"
                    component={OurTeamPage}
                />
                <AboutUsPage exact path="/pages/who-we-are/about-us" />
                <Route exact path="/pages/home" component={HomePage} />
                <Route exact path="/myaccount" component={MyAccount} />
                <Route exact path="/members" component={MembersPage} />
                <Route exact path="/subscribers" component={SubscribersPage} />
                <Route exact path="/invoices" component={InvoicesPage} />
                <Route
                    exact
                    path="/administrators"
                    component={AdministratorsPage}
                />
                <Route exact path="/payments" component={PaymentsPage} />
                <Route exact path="/donations" component={DonationsPage} />
                <Route exact path="/posts" component={PostsPage} />
                <Route exact path="/socialposts" component={SocialPostsPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={DashboardPage} />
            </Switch>
        </Router>
    );
};

export default App;
