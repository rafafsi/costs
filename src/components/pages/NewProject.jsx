import React from "react";
import { useNavigate } from 'react-router-dom';

import styles from './NewProject.module.css';

import ProjectForm from '../project/ProjectForm'

const NewProject = () => {

    const navigate = useNavigate();
    
    const createPost = (project) => {
        project.cost = 0;
        project.services = [];

        const initObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        }

        const request = new Request("http://localhost:5000/projects", initObj);

        fetch(request)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                navigate('../projects', { state: { message: 'Project created successfully!'}});
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