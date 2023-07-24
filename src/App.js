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

const App = () => {
    return (
        <Router>
            {window.location.pathname !== "/login" && <TopNav />}

            <Switch>
                <Route exact path="/members" component={MembersPage} />
                <Route exact path="/subscribers" component={SubscribersPage} />
                <Route exact path="/invoices" component={InvoicesPage} />
                <Route
                    exact
                    path="/administrators"
                    component={AdministratorsPage}
                />
                <Route exact path="/payments" component={PaymentsPage} />
                <Route exact path="/posts" component={PostsPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={DashboardPage} />
            </Switch>
        </Router>
    );
};

export default App;
