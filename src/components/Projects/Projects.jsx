import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Project from './Project';
import EventListener from 'react-event-listener';
import styles from 'stylesheets/Projects';
import Animate from 'react-move/Animate';
import AngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import AngleDoubleRight from 'react-icons/lib/fa/angle-double-right';

const numberOfGradients = 4;
const slidesArrayLastIndex = 5;

const propTypes = {
    changeProject: PropTypes.func.isRequired,
    images: PropTypes.object.isRequired
}

class Projects extends Component {
    state = {
        iterator: 0,
        disabledChange: true,
        showProject: true
    }

    componentWillMount = () => {
        sessionStorage.getItem('iterator') && this.setState({
            iterator: JSON.parse(sessionStorage.getItem('iterator'))
        });
        this.disabledChange = setTimeout(() => {
            this.setState({disabledChange: false})
        }, 1000)
    }

    componentWillUpdate = (nextProps, nextState) => {
        sessionStorage.setItem('iterator', nextState.iterator);
    }

    componentWillUnmount = () => {
        clearTimeout(this.disabledChange);
    }

    handleWheel = e => {
        if (this.state.disabledChange) { return; }
        e.wheelDelta < 0 ? this.changeSlide('next') : this.changeSlide('prev');
	}

    keyDown = e => {
        if (this.state.disabledChange) { return; }
        if (e.keyCode === 39) {
            this.changeSlide('next');
        } else if (e.keyCode === 37) {
            this.changeSlide('preve');
        }
    }

    handleClick = (direction) => {
        if (this.state.disabledChange) { return; }
        this.changeSlide(direction);
    }

    changeSlide = (direction) => {
        this.setState({ disabledChange: true, showProject: false }, () => {
            direction === 'next' ? this.nextSlide() : this.prevSlide();
            this.disabledChange = setTimeout(() => this.setState({ disabledChange: false }), 1000);
        });
    }

    nextSlide = () => {
        if (this.state.iterator === slidesArrayLastIndex) {
            this.props.changeProject('projects0');
            this.setState({ iterator: 0, showProject: true });
        } else {
            const slideNumber = (this.state.iterator + 1) % numberOfGradients;
            this.props.changeProject(`projects${slideNumber}`);
            this.setState({ iterator: this.state.iterator + 1, showProject: true });
        }
    }

    prevSlide = () => {
        if (this.state.iterator === 0) {
            this.props.changeProject('projects1');
            this.setState({ iterator: slidesArrayLastIndex, showProject: true });
        } else {
            const slideNumber = (this.state.iterator - 1) % numberOfGradients;
            this.props.changeProject(`projects${slideNumber}`);
            this.setState({ iterator: this.state.iterator - 1, showProject: true });
        }
    }

	render = () => {
        return (
		    <div className={styles.projects}>
			    <EventListener
				    target={document}
				    onWheel={this.handleWheel}
                    onKeyDown={this.keyDown}
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
                    <div>
                        <div className={styles["angle-double-left"]}>
                            <AngleDoubleLeft
                                size={36}
                                onClick={() => this.handleClick('prev')}
                            />
                        </div>
                        <div className={styles["angle-double-right"]}>
                            <AngleDoubleRight
                                className={styles["angle-double-right"]}
                                size={36}
                                onClick={() => this.handleClick('next')}
                            />
                        </div>
                    </div>
                </div>
		    </div>
        );
	}
}

Projects.propTypes = propTypes;

export default Projects;
