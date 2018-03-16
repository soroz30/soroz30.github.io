import React from 'react';
import styles from 'stylesheets/About';
import ReactLogo from './ReactLogo';

const About = () => {
	return (
        <section className={styles.container}>
            <div className={styles.photo}>
                <ReactLogo />
            </div>
            <div className={styles.about}>
                <h2 className={styles.green}><span className={styles.circle}></span>O MNIE</h2>
                <p>Mam na imię Marek, mam 31 lat. Od kilkunastu miesięcy uczę się Web Developmentu.
                W trakcie nauki ukończyłem kursy Kodilla Web Developer, Launch School i wykonałem dużo zadań związanych z nauką programowania.
                Skupiałem się głównie na nauce HTML, CSS, JavaScript, a także jQuery i React, poznałem również podstawy backendu i SQL.
                Wykonałem samodzielnie strony internetowe i aplikacje umieszczone w sekcji projekty, sukcesywnie będe dodawał nowe.
                Aktualnie poszukuję pracy na stanowisku Junior Web/Front Developer bądź stażu.</p>
            </div>
            <div className={styles.courses}>
                <h2 className={styles.green}><span className={styles.circle}></span>KURSY</h2>
                <ul>
                    <li>Kodilla Web Developer</li>
                    <li>Launch School</li>
                </ul>
            </div>
            <div className={styles.skills}>
                <h2 className={styles.green}><span className={styles.circle}></span>UMIEJĘTNOŚCI</h2>
                <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>React</li>
                </ul>
            </div>
        </section>
    )
}

export default About;
