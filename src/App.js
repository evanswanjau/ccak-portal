import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";

import TopNav from "./components/topNav";

const App = () => {
    return (
        <Router>
            <div>
                <TopNav />

                <Switch>
                    <Route path="/">
                        <Dashboard />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
