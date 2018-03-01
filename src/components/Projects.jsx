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
    handleEvent: PropTypes.func.isRequired,
    images: PropTypes.object.isRequired
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

    handleClick = () => {
        if (this.state.disabledChange) { return; }
        this.changeSlide('next');
    }

    changeSlide = (direction) => {
        const numberOfGradients = 4;
        this.setState({ disabledChange: true, showProject: false }, () => {
            direction === 'next' ? this.nextSlide() : this.prevSlide();
            setTimeout(() => this.setState({ disabledChange: false }), 1000);
        });
    }

    nextSlide = () => {
        const numberOfGradients = 4;
        const slidesArrayLength = 5;
        if (this.state.iterator === slidesArrayLength) {
            this.props.handleEvent('projects0');
            this.setState({ iterator: 0, showProject: true });
        } else {
            const slideNumber = (this.state.iterator + 1) % numberOfGradients;
            this.props.handleEvent(`projects${slideNumber}`);
            this.setState({ iterator: this.state.iterator + 1, showProject: true });
        }
    }

    prevSlide = () => {
        const numberOfGradients = 4;
        const slidesArrayLength = 5;
        if (this.state.iterator === 0) {
            this.props.handleEvent('projects0');
            this.setState({ iterator: slidesArrayLength, showProject: true });
        } else {
            const slideNumber = (this.state.iterator - 1) % numberOfGradients;
            this.props.handleEvent(`projects${slideNumber}`);
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
                                    images={this.props.images}
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
