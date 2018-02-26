import React from 'react';
import styles from '../stylesheets/Contact.sass';
import Form from './Form.jsx';

const Contact = () => {
    return (
        <div class={styles.contact}>
            <Form />
            <span>Tel: 517-243-763</span>
        </div>
    )
}

export default Contact;
