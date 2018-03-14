import React, { Component } from 'react';
import styles from 'stylesheets/ContactForm';

class ContactForm extends Component {
    state = {
        fields: {
            name: '',
            email: '',
            message: ''
        },
        submitButton: 'wyślij',
        disabled: false
    }

    onChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitButton: 'wysyłanie' });
        fetch('/contact', {
            headers: { 'content-type': 'application/json' },
            method: 'post',
            body: JSON.stringify(this.state.fields)
        }).then(response => {
            this.setState({
                fields: {
                    name: '',
                    email: '',
                    message: ''
                },
                submitButton: 'Wiadomość została wysłana!',
                disabled: true
            });
        });
    }

	render = () => {
        return (
    	    <form onSubmit={this.onSubmit} className={styles.form}>
            	<input
                    className={styles['text-input']}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="TWOJE IMIĘ *" 
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
                    <label className={styles['label-message']} htmlFor="message">Wiadomość</label>
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
                        value={this.state.submitButton}
                        disabled={this.state.disabled}
                    />
                </div>
            </form>
        );
    }
};

export default ContactForm;