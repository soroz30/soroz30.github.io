import React, {Component} from 'react';
import Project from './Project.jsx';
import EventListener from 'react-event-listener';

export default class Projects extends Component {
    state = {
        iterator: 0,
        inactiveChange: false,
        numberOfSlides: 6,
    }

	handleWheel = e => {
        if (this.state.inactiveChange) { return; }
        const numberOfGradients = 4;
        this.setState({ inactiveChange: true });
        e.wheelDelta < 0 ? this.increaseIterator() : this.decreaseIterator();
        const slideNumber = this.state.iterator % numberOfGradients;
        this.props.handleEvent(`projects${slideNumber}`);
        setTimeout(() => this.setState({ inactiveChange: false }), 1000);
	}

    increaseIterator = () => {
        if (this.state.iterator === this.state.numberOfSlides) {
            this.setState({ iterator: 0 });
        } else {
            this.setState({ iterator: this.state.iterator + 1 });
        }
    }

    decreaseIterator = () => {
        if (this.state.iterator === 0) {
            this.setState({ iterator: this.state.numberOfSlides });
        } else {
            this.setState({ iterator: this.state.iterator - 1 });
        }
    } 

	render = () => {
        return (
		    <div>
			    <EventListener
				    target={document}
				    onWheel={this.handleWheel}
			    />
			    <Project direction={this.state.direction} />
		    </div>
        );
	}
}
