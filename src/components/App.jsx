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
import Favicon from 'react-favicon';
import Animate from 'react-move/Animate';
import { detect } from 'detect-browser';
import { isBrowser } from 'react-device-detect';

const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => { images[item.slice(2, -4).toLowerCase().replace(/\W/g, '')] = r(item); });
  return images;
}

const images = importAll(require.context('../images', false, /\.jpg$/));
const imagesPaths = Object.values(images);

class App extends Component {
    state = {
        granim: 'home',
        video: true,
        showGranim: false,
        granimDelay: false
    }

    componentWillMount = () => {
        const path = window.location.hash.match(/#\/(\w*)/)[1]
        const videoSupported = this.videoSupported();
        switch (path) {
            case 'about':
                this.setState({ granim: 'about', video: false, showGranim: true, videoSupported })
                break
            case 'contact':
                this.setState({ granim: 'contact', video: false, showGranim: true, videoSupported });
                break
            case 'projects':
                const projectIterator = sessionStorage.getItem('iterator');
                const numberOfGradients = 4;
                const slideNumber = projectIterator % numberOfGradients;
                if (projectIterator) {
                    this.setState({ granim: `projects${slideNumber}`, video: false, showGranim: true, videoSupported });
                } else {
                    this.setState({ granim: 'projects0', video: false, showGranim: true, videoSupported });
                }
                break
            default:
                this.setState({ granim: 'home', video: true, showGranim: false, videoSupported });
        }
    }


    componentWillUpdate = (nextProps, nextState) => {
        clearInterval(this.removeGoogleMaps);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.granim === 'home' && this.state.videoSupported) {
            this.refs.video.play();
            clearTimeout(this.hideVideoTimeout);
        }
        this.removeGoogleMapsScripts(prevState);
        if (prevState.granim === 'home' && prevState.video && this.state.videoSupported) {
            this.hideVideo();   
        }
    }

    removeGoogleMapsScripts = (prevState) => {
        if (prevState.granim === 'contact') {
            this.removeGoogleMaps = setInterval(()=> {
                 {
                    var scripts = document.getElementsByTagName('script');
                    for(var i = 0; i < scripts.length; i++) {
                        if (scripts[i].src.match(/maps\.google/)) {
                            scripts[i].parentNode.removeChild(scripts[i]);
                        }
                    }
                }
            }, 100)
        }
    }

    videoSupported = () => {
        const browserName = detect().name;
        if (['chrome', 'firefox', 'safari'].indexOf(browserName) === -1) {
            return false
        }
        return isBrowser;
    }

    hideVideo = () => {
        this.hideVideoTimeout = setTimeout(() => {
            this.refs.video.pause();
        }, 1500);
    }

    handleEvent = (granimState) => {
        if (this.state.granim === 'home' && granimState !== 'home') {
            this.setState({ granim: granimState, showGranim: true, granimDelay: true });
        } else if (this.state.granim !== 'home' && granimState === 'home') {
            this.setState({ granim: granimState, showGranim: false, video: true, granimDelay: true });
        } else if (this.state.granim !== granimState) {
            this.setState({ granim: granimState, showGranim: true })
        }
    }

    render = () => {
        const granimMountTime = this.state.granimDelay ? 1500 : 0;
        return (
            <div>
                <Helmet>
                    <meta charSet='utf-8' />
                    <title>Portfolio</title>
                    <link href="https://fonts.googleapis.com/css?family=Poiret+One%7cRoboto+Condensed:300" rel="stylesheet"></link>
                </Helmet>
                <Favicon url={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAMZQTFRFAAAAYdr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7Ydr7////cRtO1wAAAEF0Uk5TAAAESWcyAjN/PnpjTw6lRmAUYZ0rgbubsWoBVESMk1Ydh5U88UIGeBxyia2UdS5RkWSroKxOUB6aSF45F3cgDwWjiK/CAAAAAWJLR0RBid5sTgAAAAlwSFlzAAAASAAAAEgARslrPgAAAMJJREFUGNNlzkcWgkAQBNApUBjCmJAsYkDFhCAGQBTvfyoDrLQ2/d5fVDUh/wHHt9qC0G7xHGoQqSQriixRsQFVBet02OfW0O31B5o26Pe6H4Aw1A3Tsm3LNPShAOK4dOSNJd+Xxt6Iug6ZTBns2TwI5jMbbDohjC6WK000DFFbLReUEYTrzXa3j6L9brtZh+9a4BAnxzQ9JfEB312cL7hm2RWXc/NHXji3LLs5Rd5AqdP743GnetkAqvAJPMOqrvjJC8qUEkUDC+R9AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAzLTEzVDE0OjI5OjUwKzAwOjAwfy2XWAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMy0xM1QxNDoyOTo1MCswMDowMA5wL+QAAABGdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuNy44LTkgMjAxNC0wNS0xMiBRMTYgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfchu0AAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OmhlaWdodAAxOTIPAHKFAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADE5MtOsIQgAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTUyMDk1MTM5MP1w+BYAAAAPdEVYdFRodW1iOjpTaXplADBCQpSiPuwAAABWdEVYdFRodW1iOjpVUkkAZmlsZTovLy9tbnRsb2cvZmF2aWNvbnMvMjAxOC0wMy0xMy9lNjAyMWJiYzNiZDAyM2E1NGE5NGQ1YjJjYjQ5YWRmNi5pY28ucG5nfAu/qAAAAABJRU5ErkJggg=='} />
                <PreCacheImg images={imagesPaths} />
                {   this.state.videoSupported ? (
                        this.state.video ? (
                                <div className={styles['video-container']}>
                                    <video ref="video" autoPlay muted loop>
                                        <source src="http://res.cloudinary.com/soroz30/video/upload/v1521021745/OMSBG5.mp4" type="video/mp4"/>
                                    </video>
                                </div>
                                ) : (
                                <div className={styles['video-container']}>
                                    <video ref="video" muted className={styles['hidden-video']}>
                                        <source src="http://res.cloudinary.com/soroz30/video/upload/v1521021745/OMSBG5.mp4" type="video/mp4"/>
                                    </video>
                                </div>
                                )
                            )
                        :   (
                                null
                        )
                }
                { this.state.videoSupported ? (
                        <Animate
                            show={this.state.showGranim}
                            start={{ opacity: 0 }}
                            enter={{
                                opacity: [1],
                                timing: { duration: granimMountTime }}}
                            update={{
                                opacity: [1],
                                timing: { duration: granimMountTime }}}
                            leave={{
                                opacity: [0],
                                timing: { duration: granimMountTime }}}
                        >
                            {({ opacity }) => {
                                return (
                                    <div style={{opacity}}>
                                        <Granim 
                                            defaultStateName={this.state.granim}
                                            states={granimData}
                                            granimClass={styles.Granim}
                                        ></Granim>
                                    </div>
                                )
                            }}
                        </Animate>
                    ) : (
                            <Granim 
                                defaultStateName={this.state.granim}
                                states={granimData}
                                granimClass={styles.Granim}
                            ></Granim> 
                    )
                }
                <div className={styles.Portfolio}>
                    <TopNav handleEvent={this.handleEvent} />
                    <Switch >
                        <Route exact path="/" render={() => {
                            return (
                                <Home
                                    handleEvent={this.handleEvent}
                                />
                            )
                        }} />
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
                    <Footer modified={this.state.granim.match(/(about|contact)/)} />
                </div>
            </div>
        );
    }
}

export default hot(module)(App);
