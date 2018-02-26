import React from 'react';
import styles from 'stylesheets/Form';

const Form = () => {
	return (
	    <form method='POST' className={styles.form}>
        	<fieldset>
        		<label htmlFor='name'>Name</label>
        		<input id='name' type='text' name='name' />
        	</fieldset>

     		<fieldset>
        		<label htmlFor='email'>Email</label>
        		<input id='email' type='email' name='email' />
        	</fieldset>

     		<fieldset>
        		<label htmlFor='message'>Message</label>
        		<textarea id='message' name='message' rows='10'></textarea>
        	</fieldset>

     		<fieldset>
        		<input type='submit' value='Send'/>
        	</fieldset>
        </form>
    )
}

export default Form;