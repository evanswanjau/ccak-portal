import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TopNav from "./components/topNav";
import Posts from "./pages/posts";

const App = () => {
    return (
        <Router>
            <TopNav />

            <Switch>
                <Route exact path="/posts" component={Posts} />
            </Switch>
        </Router>
    );
};

export default App;
