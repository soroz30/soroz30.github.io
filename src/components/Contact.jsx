import React from 'react';
import styles from 'stylesheets/Contact';
import Form from './Form';

const Contact = () => {
    return (
        <div className={styles.contact}>
            <Form />
            <span>Tel: 517-243-763</span>
        </div>
    );
};

export default Contact;
