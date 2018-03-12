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
import PreCacheImg from 'react-precache-img';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive';

const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => { images[item.slice(2, -4).toLowerCase().replace(/\W/g, '')] = r(item); });
  return images;
}

const images = importAll(require.context('../images', false, /\.jpg$/));
const imagesPaths = Object.values(images);

class App extends Component {
    state = {
        granim: 'home'
    }

    componentWillMount = () => {
        const path = window.location.hash.match(/#\/(\w*)/)[1]
        switch (path) {
            case 'about':
                this.setState({ granim: 'about' })
                break
            case 'contact':
                this.setState({ granim: 'contact' });
                break
            case 'projects':
                const projectIterator = sessionStorage.getItem('iterator');
                const numberOfGradients = 4;
                const slideNumber = projectIterator % numberOfGradients;
                if (projectIterator) {
                    this.setState({ granim: `projects${slideNumber}`});
                } else {
                    this.setState({ granim: 'projects0' });
                }
                break
            default:
                this.setState({ granim: 'home' });
        }
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
                    <link href="https://fonts.googleapis.com/css?family=Poiret+One" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet"></link>
                </Helmet>
                <PreCacheImg images={imagesPaths} />
                <MediaQuery query="(max-width: 991px)">
                    {(matches) => {
                        if (matches) {
                            const modified = this.state.granim.match(/(about|contact)/);
                            return <Granim 
                                defaultStateName={this.state.granim}
                                states={granimData}
                                granimClass={ modified ? styles['Modified-Granim'] : styles.Granim }
                            ></Granim>
                        } else {
                            return <Granim 
                                defaultStateName={this.state.granim}
                                states={granimData}
                                granimClass={styles.Granim}
                            ></Granim>
                        }
                    }}
                </MediaQuery>
                    <div className={styles.Portfolio}>
                        <TopNav handleEvent={this.handleEvent} />
                        <Switch >
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
                        <MediaQuery query="(max-width: 991px)">
                            {(matches) => {
                                if (matches) {
                                    return <Footer modified={this.state.granim.match(/(about|contact)/)}/>
                                } else {
                                    return <Footer />
                                }
                            }}
                        </MediaQuery>
                    </div>
            </div>
        );
    }
}

export default hot(module)(App);
