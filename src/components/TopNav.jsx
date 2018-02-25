import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../stylesheets/TopNav.sass';

const TopNav = (props) => {
    return (
        <div className={styles['Top-Nav']}>
            <NavLink exact to='/' className={styles.link} activeClassName={styles.active} onClick={() => props.handleEvent('home')}>Home</NavLink>
            <NavLink to='/projects' className={styles.link} activeClassName={styles.active} onClick={() => props.handleEvent('projects0')}>Projects</NavLink>
            <NavLink to='/contact' className={styles.link} activeClassName={styles.active} onClick={() => props.handleEvent('contact')}>Contact</NavLink>
        </div>
    );
}

export default TopNav;
