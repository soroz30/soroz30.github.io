import React, { Component } from 'react';
import styles from 'stylesheets/ContactForm';

class ContactForm extends Component {
    state = {
        fields: {
            name: '',
            email: '',
            message: ''
        },
        sending: false
    }

    onChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    }

    onSubmit = () => {
        this.setState({ sending: true })
    }

	render = () => {
        return (
    	    <form onSubmit={this.onSubmit} method="POST" className={styles.form} action="/contact">
            	<input
                    className={styles['text-input']}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="YOUR NAME *" 
                    required
                    onChange={this.onChange}
                    value={this.state.fields.name}
                />
            	<input
                    className={styles['text-input']}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="EMAIL *"
                    required
                    onChange={this.onChange}
                    value={this.state.fields.email}
                />
                <div className={styles['bottom-partial']}>
                    <label className={styles['label-message']} htmlFor="message">Message</label>
                	<textarea
                        id="message"
                        name="message"
                        rows="12"
                        required
                        onChange={this.onChange}
                        value={this.state.fields.message}
                    ></textarea>
                	<input
                    className={styles['submit-input']}
                    type="submit"
                    value={this.state.sending ? 'Sending' : 'Send'}
                    />
                </div>
            </form>
        );
    }
};

export default ContactForm;