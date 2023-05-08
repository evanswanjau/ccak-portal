import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";

import TopNav from "./components/topNav";
import Payments from "./pages/payments";
import News from "./pages/pages/media-centre/news";

const App = () => {
    return (
        <Router>
            <TopNav />

            <Switch>
                <Route exact path="/pages/media-centre/news" component={News} />
                <Route exact path="/payments" component={Payments} />
                <Route exact path="/" component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default App;
