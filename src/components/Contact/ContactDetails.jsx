import React from 'react';
import styles from 'stylesheets/ContactDetails';
import LocationMap from './LocationMap';

const ContactDetails = () => {
	return (
		<div className={styles.container}>
            <div className={styles.address}>
                <span className={styles.circle}></span>
                <p className={styles.contact}>MAREK KOSESKI<br/>
                marek.koseski86@gmail.com<br/>
                tel. +48 517 243 763</p>
            </div>
            <LocationMap
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div className={styles['loading-element']} />}
                containerElement={<div className={styles['map-container']} />}
                mapElement={<div className={styles['map-element']} />}
            />
        </div>
	)
}

export default ContactDetails;
