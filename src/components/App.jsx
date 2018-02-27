import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Projects from './Projects';
import TopNav from './TopNav';
import Contact from './Contact';
import { hot } from 'react-hot-loader';
import styles from 'stylesheets/App';
import Granim from './Granim';
import granimData from '../data/granimData';
import {Helmet} from 'react-helmet';

class App extends Component {
    state = {
        granim: 'home'
    }

    handleEvent = (granimState) => {
        this.setState({granim: granimState});
    }

    render = () => {
        return (
            <div>
                <Helmet>
                    <meta charSet='utf-8' />
                    <title>Portfolio</title>
                    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"></link>
                </Helmet>
                <Granim 
                    defaultStateName={this.state.granim}
                    states={granimData}
                    granimClass={styles.Granim}
                ></Granim>
                    <div className={styles.Portfolio}>
                        <TopNav handleEvent={this.handleEvent} />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/projects" render={() => {
                                return (
                                    <Projects handleEvent={this.handleEvent} />
                                )
                            }} />
                            <Route path="/contact" component={Contact} />
                        </Switch>
                    </div>
            </div>
        );
    }
}

export default hot(module)(App);
