import { React, useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";

import styles from '../project/ProjectForm.module.css';

const ServiceForm = ({ handleSubmit, btnText, projectData }) => {

    const [service, setService] = useState({});

    const submit = (e) => {
        e.preventDefault();
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Service name"
                name="name"
                placeholder="Enter service name"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Service cost"
                name="cost"
                placeholder="Enter total value"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Service description"
                name="description"
                placeholder="Describe the service"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm;