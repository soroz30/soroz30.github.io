import React, {Component} from 'react';
import Project from './Project';
import EventListener from 'react-event-listener';
import styles from 'stylesheets/Projects';
import Animate from 'react-move/Animate';
import MediaQuery from 'react-responsive';
import AngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import AngleDoubleRight from 'react-icons/lib/fa/angle-double-right';

export default class Projects extends Component {
    state = {
        iterator: 0,
        inactiveChange: false,
        numberOfSlides: 6,
        showProject: true
    }

	handleWheel = e => {
        e.preventDefault();
        if (this.state.inactiveChange) { return; }
        const numberOfGradients = 4;
        this.setState({ inactiveChange: true, showProject: false });
        e.wheelDelta < 0 ? this.increaseIterator() : this.decreaseIterator();
        const slideNumber = this.state.iterator % numberOfGradients;
        this.props.handleEvent(`projects${slideNumber}`);
        setTimeout(() => this.setState({ inactiveChange: false }), 1000);
	}

    handleClick = e => {
        e.preventDefault();
        if (this.state.inactiveChange) { return; }
        const numberOfGradients = 4;
        this.setState({ inactiveChange: true, showProject: false }, () => {;
            this.increaseIterator();
            const slideNumber = this.state.iterator % numberOfGradients;
            this.props.handleEvent(`projects${slideNumber}`);
            setTimeout(() => this.setState({ inactiveChange: false }), 1000);
        });
    }

    prevSlide = e => {
        e.preventDefault();
        if (this.state.inactiveChange) { return; }
        const numberOfGradients = 4;
        this.setState({ inactiveChange: true, showProject: false }, () => {;
            this.decreaseIterator();
            const slideNumber = this.state.iterator % numberOfGradients;
            this.props.handleEvent(`projects${slideNumber}`);
            setTimeout(() => this.setState({ inactiveChange: false }), 1000);
        });
    }

    increaseIterator = () => {
        if (this.state.iterator === this.state.numberOfSlides - 1) {
            this.setState({ iterator: 0, showProject: true });
        } else {
            this.setState({ iterator: this.state.iterator + 1, showProject: true });
        }
    }

    decreaseIterator = () => {
        if (this.state.iterator === 0) {
            this.setState({ iterator: this.state.numberOfSlides - 1, showProject: true });
        } else {
            this.setState({ iterator: this.state.iterator - 1, showProject: true });
        }
    }

	render = () => {
        return (
		    <div>
			    <EventListener
				    target={document}
				    onWheel={this.handleWheel}
			    />
                <Animate
                    show={this.state.showProject}
                    start={{ opacity: 0 }}
                    enter={{
                        opacity: [1],
                        timing: { duration: 750 }}}
                >
                    {({ opacity }) => {
                        return (
                            <div style={{opacity}}>
        		                <Project
                                    projectNumber={this.state.iterator}
                                />
                            </div>
                        )
                    }}
                </Animate>
                <div className={styles.navigation}>
                    <MediaQuery minWidth={992}>
                        {(matches) => {
                            if (matches) 
                                return <span className={styles.scroll} onClick={this.handleClick}></span>
                            else {
                                return (
                                    <div>
                                        <AngleDoubleLeft className={styles['angle-double']} size={36} onClick={this.prevSlide}/>
                                        <AngleDoubleRight className={styles['angle-double']} size={36} onClick={this.handleClick}/>
                                    </div>
                                )
                            }
                        }}
                    </MediaQuery>
                </div>
		    </div>
        );
	}
}
