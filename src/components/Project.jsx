import React from 'react';
import PropTypes from 'prop-types';
import styles from 'stylesheets/Project';
import projectsData from '../data/projectsData';
import GithubLogo from 'react-icons/lib/fa/github';

const propTypes = {
    projectNumber: PropTypes.number.isRequired
}

const Project = ({projectNumber}) => {
    const { img, description, gitPage, gitCode } = projectsData[projectNumber];
	return (
        <div>
            <figure className={styles.figure}>
                <a href={gitPage}><img src={`dist/${img}`} className={styles.image} alt="Project"/></a>
                <figcaption
                    className={styles.figcaption}>
                    {description}
                    <a className={styles["git-link"]} href={gitCode}>
                        Github
                        <GithubLogo size={36}/>
                    </a>
                </figcaption>
            </figure>
	    </div>
    );
};

Project.propTypes = propTypes;

export default Project;
