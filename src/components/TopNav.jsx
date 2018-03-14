import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from 'stylesheets/TopNav';

const propTypes = {
	handleEvent: PropTypes.func.isRequired
}

const TopNav = (props) => {
    return (
        <div className={styles["Top-Nav"]}>
            <NavLink 
            	exact to="/"
            	className={styles.link}
            	activeClassName={styles.active}
            	onClick={() => props.handleEvent("home")}
            >Home</NavLink>
            <NavLink
            	to="/about"
            	className={styles.link}
            	activeClassName={styles.active}
            	onClick={() => props.handleEvent("about")}
            >O mnie</NavLink>
            <NavLink
            	to="/projects"
            	className={styles.link}
            	activeClassName={styles.active}
            	onClick={() => props.handleEvent("projects0")}
            >Projekty</NavLink>
            <NavLink
            	to="/contact"
            	className={styles.link}
            	activeClassName={styles.active}
            	onClick={() => props.handleEvent("contact")}
            >Kontakt</NavLink>
        </div>
    );
};

TopNav.propTypes = propTypes;

export default TopNav;
