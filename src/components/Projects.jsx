import React, {Component} from 'react';
import Project from './Project.jsx';
import EventListener from 'react-event-listener';
import styles from '../stylesheets/Projects.sass';
import Animate from 'react-move/Animate';

export default class Projects extends Component {
    state = {
        iterator: 0,
        inactiveChange: false,
        numberOfSlides: 6,
        showProject: true
    }

	handleWheel = e => {
        if (this.state.inactiveChange) { return; }
        const numberOfGradients = 4;
        this.setState({ inactiveChange: true, showProject: false });
        e.wheelDelta < 0 ? this.increaseIterator() : this.decreaseIterator();
        const slideNumber = this.state.iterator % numberOfGradients;
        this.props.handleEvent(`projects${slideNumber}`);
        setTimeout(() => this.setState({ inactiveChange: false }), 1000);
	}

    handleClick = e => {
        if (this.state.inactiveChange) { return; }
        const numberOfGradients = 4;
        this.setState({ inactiveChange: true, showProject: false }, () => {;
            this.increaseIterator();
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
                    <span className={styles.scroll} onClick={() => this.handleClick()}></span>
                </div>
		    </div>
        );
	}
}
