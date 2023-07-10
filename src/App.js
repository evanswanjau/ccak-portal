import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TopNav from "./components/topNav";
import Posts from "./pages/posts";
import { Login } from "./pages/login";

const App = () => {
    return (
        <Router>
            {window.location.pathname !== "/login" && <TopNav />}

            <Switch>
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router>
    );
};

export default App;
