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
                    path="/pages/who-we-are/our-team"
                    component={OurTeamPage}
                />
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
