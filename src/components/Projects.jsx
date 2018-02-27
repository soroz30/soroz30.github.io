import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Project from './Project';
import EventListener from 'react-event-listener';
import styles from 'stylesheets/Projects';
import Animate from 'react-move/Animate';
import MediaQuery from 'react-responsive';
import AngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import AngleDoubleRight from 'react-icons/lib/fa/angle-double-right';

const propTypes = {
    handleEvent: PropTypes.func.isRequired
}

class Projects extends Component {
    state = {
        iterator: 0,
        disabledChange: false,
        showProject: true
    }

	handleWheel = e => {
        if (this.state.disabledChange) { return; }
        e.wheelDelta < 0 ? this.changeSlide('next') : this.changeSlide('prev');
	}

    nextSlide = e => {
        if (this.state.disabledChange) { return; }
        this.changeSlide('next');
    }

    prevSlide = e => {
        if (this.state.disabledChange) { return; }
        this.changeSlide('prev');
    }

    changeSlide = (direction) => {
        const numberOfGradients = 4;
        this.setState({ disabledChange: true, showProject: false }, () => {
            direction === 'next' ? this.increaseIterator() : this.decreaseIterator();
            const slideNumber = this.state.iterator % numberOfGradients;
            this.props.handleEvent(`projects${slideNumber}`);
            setTimeout(() => this.setState({ disabledChange: false }), 1000);
        });
    }

    increaseIterator = () => {
        const slidesArrayLength = 5;
        if (this.state.iterator === slidesArrayLength) {
            this.setState({ iterator: 0, showProject: true });
        } else {
            this.setState({ iterator: this.state.iterator + 1, showProject: true });
        }
    }

    decreaseIterator = () => {
        const slidesArrayLength = 5;
        if (this.state.iterator === 0) {
            this.setState({ iterator: slidesArrayLength, showProject: true });
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
                                return <span className={styles.scroll} onClick={this.nextSlide}></span>
                            else {
                                return (
                                    <div>
                                        <AngleDoubleLeft 
                                            className={styles["angle-double"]} 
                                            size={36}
                                            onClick={this.prevSlide}
                                        />
                                        <AngleDoubleRight
                                            className={styles["angle-double"]}
                                            size={36}
                                            onClick={this.nextSlide}
                                        />
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

Projects.propTypes = propTypes;

export default Projects;
