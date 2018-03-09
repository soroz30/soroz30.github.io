import React from 'react';
import styles from 'stylesheets/About';

const About = () => {
	return (
        <section className={styles.container}>
            <div className={styles.photo}>
                <img src="http://via.placeholder.com/150x225"/>
            </div>
            <div className={styles.about}>
                <h2 className={styles.green}><span className={styles.circle}></span>ABOUT</h2>
                <p>Curabitur cursus sem a malesuada viverra. Fusce magna nunc, laoreet eu rhoncus vel, tempus et est.
                Vestibulum finibus vulputate eros, vel egestas dolor imperdiet in. In hac habitasse platea dictumst.
                Aenean ullamcorper nec augue vel tempor. Donec consectetur sem vitae sem maximus tristique.
                Pellentesque ligula leo, luctus nec eros vel, porttitor ultricies diam. In mattis fermentum neque,
                vitae porttitor neque euismod non. Donec pharetra orci magna, bibendum semper justo molestie non. 
                Aenean tincidunt lacus nibh, at semper purus blandit sed. Quisque fermentum blandit suscipit.</p>
            </div>
            <div className={styles.courses}>
                <h2 className={styles.green}><span className={styles.circle}></span>COURSES</h2>
                <ul>
                    <li>Kodilla Web Developer</li>
                    <li>Launch School</li>
                </ul>
            </div>
            <div className={styles.skills}>
                <h2 className={styles.green}><span className={styles.circle}></span>SKILLS</h2>
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
