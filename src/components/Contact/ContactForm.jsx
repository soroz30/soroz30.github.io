import React from 'react';
import styles from 'stylesheets/ContactForm';

const ContactForm = () => {
	return (
	    <form method="POST" className={styles.form}>
        	<input className={styles['text-input']} id="name" type="text" name="name" placeholder="YOUR NAME *" required/>
        	<input className={styles['text-input']} id="email" type="email" name="email" placeholder="EMAIL *" required/>
            <div className={styles['bottom-partial']}>
                <label className={styles['label-message']} htmlFor="message">Message</label>
            	<textarea id="message" name="message" rows="12" required></textarea>
            	<input className={styles['submit-input']} type="submit" value="Send"/>
            </div>
        </form>
    );
};

export default ContactForm;