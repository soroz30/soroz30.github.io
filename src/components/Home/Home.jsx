import React from 'react';
import styles from 'stylesheets/Home';
import { NavLink } from 'react-router-dom';

const Home = ({handleEvent}) => {
    return (
        <div>
            <NavLink to="/about">
                <div className={styles.circle}>
                    <h1>Marek Koseski</h1>
                </div>
            </NavLink>
        </div>
    );
};

export default Home;
