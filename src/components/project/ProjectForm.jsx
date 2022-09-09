import { React, useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

import styles from './ProjectForm.module.css';

const ProjectForm = ({ btnText, handleSubmit, projectData }) => {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => setCategories(data))
            .catch((error) => console.log(error))
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    }

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value })
    } 

    const handleSelect = (e) => {
        setProject({ 
            ...project, 
            selected: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }
    })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Project Name"
                name="name"
                placeholder="Enter project name" 
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
                />
            <Input
                type="number"
                text="Project Budget"
                name="budget"
                placeholder="Enter total project budget" 
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select 
                text="Select category"
                name="category_id" 
                options={categories}
                handlenOnChange={handleSelect}
                value={project.selected ? project.selected.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm;