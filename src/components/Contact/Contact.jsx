import React from 'react';
import styles from 'stylesheets/Contact';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';

const Contact = () => {
    return (
        <div className={styles.contact}>
        	<ContactDetails />
            <ContactForm />
        </div>
    );
};

export default Contact;
