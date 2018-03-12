import React from 'react';
import styles from 'stylesheets/Home';
import { NavLink } from 'react-router-dom';

const Home = ({handleEvent}) => {
    return (
        <div>
            <video autoPlay muted loop className={styles.video}>
                <source src="/videos/OMSBG5.mp4" type="video/mp4"/>
            </video>
            <NavLink to="/about">
                <div className={styles.circle} onClick={() => handleEvent('about')}>
                    <h1>Marek Koseski</h1>
                </div>
            </NavLink>
        </div>
    );
};

export default Home;
