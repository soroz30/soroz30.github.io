import React from 'react';
import styles from 'stylesheets/Footer';

const Footer = () => {
	return (
		<footer className={styles.footer}>
            <div className={styles.container}>
    			<hr />
                <div className={styles.reserved}>
                    <p>2018, Marek Koseski, All Rights Reserved</p>
                </div>
    			<div className={styles.contact}>
                    <p>CONTACT</p>
                    <p>marek.koseski86@gmail.com<br/>517-243-763</p>
                </div>
            </div>
		</footer>
	)
}

export default Footer;