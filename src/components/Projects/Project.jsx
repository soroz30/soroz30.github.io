import React from 'react';
import PropTypes from 'prop-types';
import styles from 'stylesheets/Project';
import projectsData from '../../data/projectsData';

const propTypes = {
    projectNumber: PropTypes.number.isRequired,
    images: PropTypes.object.isRequired
}

const Project = ({projectNumber, images}) => {
    const { description, gitPage, gitCode } = projectsData[projectNumber];
    const imageKey = description.toLowerCase().replace(/\W/g, '');
	return (
        <div>
            <figure className={styles.figure}>
                <a href={gitPage}><img src={images[imageKey]} className={styles.image} alt="Project"/></a>
                <figcaption
                    className={styles.figcaption}>
                    {description}
                    <a className={styles["git-link"]} href={gitCode}>
                        Github
                    </a>
                </figcaption>
            </figure>
	    </div>
    );
};

Project.propTypes = propTypes;

export default Project;
