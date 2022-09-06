import React from "react";

import styles from './NewProject.module.css';

import ProjectForm from '../project/ProjectForm'

const NewProject = () => {
    return (
        <div className={styles.newproject_container}>
            <h1>Create project</h1>
            <p>Create your project and then add the services</p>
            <ProjectForm btnText="Create Project"/>
        </div>
    )
}

export default NewProject;