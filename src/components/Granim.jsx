import React, { Component } from 'react';
import PropTypes from 'prop-types';
import granim from 'granim';

const propTypes = {
    defaultStateName: PropTypes.string,
    granimClass: PropTypes.string,
    states: PropTypes.object.isRequired
}

class Granim extends Component {
    componentDidMount = () => {
        this.granim = new granim({
            defaultStateName: this.props.defaultStateName,
            direction: 'radial',
            element: '#granim',
            name: 'granim',
            opacity: [1, 1],
            states: this.props.states,
            stateTransitionSpeed: 1000
        });
    }

    componentWillReceiveProps = nextProps => {
        this.granim.changeState(nextProps.defaultStateName);
    }

	render = () => {
		return (
            <canvas id="granim" className={this.props.granimClass} />   
        )
	}
}

Granim.propTypes = propTypes;

export default Granim;
