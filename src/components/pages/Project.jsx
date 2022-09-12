import { v4 as uuidv4 } from 'uuid';

import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loading from './../layout/Loading';
import Container from './../layout/Container';
import Message from '../layout/Message';

import styles from './Project.module.css';
import ProjectForm from "../project/ProjectForm";

import ServiceForm from "../service/ServiceForm";
import ServiceCard from '../service/ServiceCard';

const Project = () => {

    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    const endpointProjectID = `http://localhost:5000/projects/${project.id}`;

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
                    setServices(data.services)
                })
                .catch((error) => console.log(error))
        }, 300)
    }, [id])


    const editPost = (project) => {
        setMessage('')

        if (project.budget < project.cost) {
            setMessage("The budget cannot be less than the project cost!");
            setType("error");
            return false
        }

        fetch(endpointProjectID, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
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

    const createService = (project) => {
        setMessage('')

        //get last service
        const length = project.services.length - 1;
        const lastService = project.services[length]
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        //maximum cost validation
        if (newCost > parseFloat(project.budget)) {
            setMessage("Overbudget! Check the service value.")
            setType("error")
            project.services.pop()
            return false
        }

        //add cost service to project total cost
        project.cost = newCost;

        //update project
        fetch(endpointProjectID, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then(() => {
                setShowServiceForm(false)
            })
            .catch((error) => console.log(error))
    }

    const removeService = (id, cost) => {
        setMessage('')

        const servicesUpdated = project.services.filter((service) => service.id !== id) //take out the service that has the id
        const projectUpdated = project; //making a copy of my project
        projectUpdated.services = servicesUpdated //my project without the service that I don't wanna anymore
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUpdated)
        })
            .then((resp) => resp.json())
            .then(() => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                setMessage("Service removed successfully!")
                setType("success")
            })
            .catch((error) => console.log(error))
    }


    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
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
                                        <span>Total used:</span> R$ {project.cost}
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
                        <div className={styles.service_form_container}>
                            <h2>Add a service:</h2>
                            <button
                                className={styles.btn}
                                onClick={toggleServiceForm}>
                                {!showServiceForm ? "Add service" : "Close"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Add service"
                                        projectData={project} />
                                )}
                            </div>
                        </div>
                        <h2>Services</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>There are no services registered.</p>}
                        </Container>
                    </Container>
                </div>
            )
                : <Loading />}
        </>

    )
}

export default Project;