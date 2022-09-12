import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import Container from '../layout/Container';
import Loading from "../layout/Loading";
import LinkButton from '../layout/LinkButton'
import Message from "../layout/Message";

import ProjectCard from "../project/ProjectCard";

import styles from './Projects.module.css';

const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((error) => console.log(error))
        }, 300)
    }, [])

    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    const removeProject = (id) => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id));
                setProjectMessage('Project deleted successfully!');
            })
            .catch(error => console.log(error))
    }


    return (
        <div className={styles.projects_container}>
            <div className={styles.title_container}>
                <h1>My projects</h1>
                <LinkButton to="/newproject" text="Create project" />
            </div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message msg={projectMessage} type="success" />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) =>
                        <ProjectCard
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.selected.name}
                            key={project.id}
                            handleRemove={removeProject} />)}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>There are no projects registered!</p>
                )}
            </Container>
        </div>

    )
}

export default Projects;