import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TopNav from "./components/topNav";
import { PostsPage } from "./pages/posts";
import { Login } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";
import { PaymentsPage } from "./pages/payments";

const App = () => {
    return (
        <Router>
            {window.location.pathname !== "/login" && <TopNav />}

            <Switch>
                <Route exact path="/payments" component={PaymentsPage} />
                <Route exact path="/posts" component={PostsPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={DashboardPage} />
            </Switch>
        </Router>
    );
};

export default App;
