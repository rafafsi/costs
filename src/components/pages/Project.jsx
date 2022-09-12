import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loading from './../layout/Loading';
import Container from './../layout/Container';
import Message from '../layout/Message';

import styles from './Project.module.css';
import ProjectForm from "../project/ProjectForm";

const Project = () => {

    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => resp.json())
                .then((data) => {
                    setProject(data)
                })
                .catch((error) => console.log(error))
        }, 300)
    }, [id])

    
    const editPost = (project) => {
        //budget validation 
        console.log(project)
        if (project.budget < project.cost) {
            setMessage("The budget cannot be less than the project cost!")
            setType("error")
            console.log(project)
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH", //só atualiza o que for alterado. update atualiza tudo
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage("Updated project!")
                setType("success")
            })
            .catch((error) => console.log(error))
    }
    
    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} message={message} />}
                        <div className={styles.details_container}>
                            <h1>Project: {project.name}</h1>
                            <button
                                className={styles.btn}
                                onClick={toggleProjectForm}>
                                {!showProjectForm ? "Edit project" : "Close"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Category:</span> {project.selected.name}
                                    </p>
                                    <p>
                                        <span>Total budget:</span> R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Total used:</span> {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Finish editing"
                                        projectData={project} />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            )
                : <Loading />}
        </>

    )
}

export default Project;