import { React, useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

import styles from './ProjectForm.module.css';

const ProjectForm = ({ btnText }) => {

    const [categories, setCategories] = useState([]);

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
    }, [])

    return (
        <form className={styles.form}>
            <Input
                type="text"
                text="Project Name"
                name="name"
                placeholder="Enter project name" />

            <Input
                type="number"
                text="Project Budget"
                name="budget"
                placeholder="Enter total project budget" />

            <Select
                text="Select category"
                name="category_id" 
                options={categories}/>

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm;