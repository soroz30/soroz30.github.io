import React from 'react';
import styles from '../stylesheets/Project.sass';
import projectsData from '../data/projectsData.js';
import FontAwesome from 'react-icons/lib/fa/github';

const Project = ({projectNumber}) => {

    const { img, description, gitPage, gitCode } = projectsData[projectNumber];
	return (
        <div>
            <figure className={styles.figure}>
                <a href={gitPage}><img src={img} className={styles.image}/></a>
                <figcaption
                    className={styles.figcaption}>
                    {description}
                    <a className={styles['git-link']} href={gitCode}>
                        Github
                        <FontAwesome size={36}/>
                    </a>
                </figcaption>
            </figure>
	    </div>
    )
}

export default Project;
