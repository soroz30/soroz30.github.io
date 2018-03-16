import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { HashRouter as Router } from "react-router-dom";
import { withRouter } from 'react-router'

const AppWithRouter = withRouter(App);

ReactDOM.render(
    <Router>
        <AppWithRouter />
    </Router>,
    document.getElementById('root')
);
