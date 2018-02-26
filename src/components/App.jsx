import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Projects from './Projects.jsx';
import TopNav from './TopNav.jsx';
import Contact from './Contact.jsx';
import NotFound from './NotFound.jsx';
import { hot } from 'react-hot-loader';
import styles from '../stylesheets/App.sass';
import Granim from './Granim.jsx';
import granimData from '../data/granimData.js';
import {Helmet} from "react-helmet";

class App extends Component {
    state = {
        granim: 'home'
    }

    handleEvent = (granimState) => {
        this.setState({granim: granimState});
    }

    componentWillReceiveProps = () => {
        console.log('app')
    }

    render = () => {
        return (
            <div>
                <Helmet>
                    <meta charSet='utf-8' />
                    <title>Portfolio</title>
                </Helmet>
                <Granim 
                    defaultStateName={this.state.granim}
                    states={granimData}
                    granimClass={styles.Granim}
                ></Granim>
                <BrowserRouter>
                    <div className={styles.Portfolio}>
                        <TopNav handleEvent={this.handleEvent} />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/projects' render={() => {
                                return (
                                    <Projects handleEvent={this.handleEvent} />
                                )
                            }} />
                            <Route path='/contact' component={Contact} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default hot(module)(App);
