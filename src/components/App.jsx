import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopNav from './TopNav';
import Home from './Home/Home';
import About from './About/About';
import Projects from './Projects/Projects';
import Contact from './Contact/Contact';
import Footer from './Footer';
import { hot } from 'react-hot-loader';
import styles from 'stylesheets/App';
import Granim from './Granim';
import granimData from '../data/granimData';
import { Helmet } from 'react-helmet';

const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => { images[item.slice(2, -4).toLowerCase().replace(/\W/g, '')] = `dist/${r(item)}`; });
  return images;
}

const images = importAll(require.context('../images', false, /\.jpg$/));

class App extends Component {
    state = {
        granim: 'home'
    }

    handleEvent = (granimState) => {
        this.setState({ granim: granimState });
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
                    <div className={styles.Portfolio}>
                        <TopNav handleEvent={this.handleEvent} />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/projects" render={() => {
                                return (
                                    <Projects
                                        handleEvent={this.handleEvent}
                                        images={images}
                                    />
                                )
                            }} />
                            <Route path="/contact" component={Contact} />
                            <Route component={Home} />
                        </Switch>
                        <Footer />
                    </div>
            </div>
        );
    }
}

export default hot(module)(App);
