import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'stylesheets/TopNav';

const TopNav = (props) => {
    return (
        <div className={styles["Top-Nav"]}>
            <NavLink 
            	exact to="/"
            	className={styles.link}
            	activeClassName={styles.active}
            >Home</NavLink>
            <NavLink
            	to="/about"
            	className={styles.link}
            	activeClassName={styles.active}
            >O mnie</NavLink>
            <NavLink
            	to="/projects"
            	className={styles.link}
            	activeClassName={styles.active}
            >Projekty</NavLink>
            <NavLink
            	to="/contact"
            	className={styles.link}
            	activeClassName={styles.active}
            >Kontakt</NavLink>
        </div>
    );
};

export default TopNav;
