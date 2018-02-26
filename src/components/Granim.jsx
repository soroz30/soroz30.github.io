import React, { Component } from 'react';
import PropsType from 'prop-types';
import granim from 'granim';

export default class Granim extends Component {
	static propsType = {
		defaultStateName: PropsType.string,
		states: PropsType.object.isRequired
	}

    componentDidMount = () => {
        console.log(this.props.states);
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
            <canvas id='granim' className={this.props.granimClass} />   
        )
	}
}
