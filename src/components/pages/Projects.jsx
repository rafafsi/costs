import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton'

import Message from "../layout/Message";
import ProjectCard from "../project/ProjectCard";

import styles from './Projects.module.css';

const Projects = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setProjects(data)
            })
            .catch((error) => console.log(error))
    }, [])

    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state.message;
    }


    return (
        <div className={styles.projects_container}>
            <div className={styles.title_container}>
                <h1>My projects</h1>
                <LinkButton to="/newproject" text="Create project" />
            </div>
            {message && <Message msg={message} type="success" />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) =>
                        <ProjectCard
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.selected.name}
                            key={project.id} />)}
            </Container>
        </div>

    )
}

export default Projects;