import React from "react";
import { useNavigate } from 'react-router-dom';

import styles from './NewProject.module.css';

import ProjectForm from '../project/ProjectForm'

const NewProject = () => {

    const navigate = useNavigate();

    const createPost = (project) => {
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then(() => {
                navigate('../projects', { state: { message: 'Project created successfully!' } });
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Create project</h1>
            <p>Create your project and then add the services</p>
            <ProjectForm handleSubmit={createPost} btnText="Create Project" />
        </div>
    )
}

export default NewProject;