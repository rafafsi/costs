import React from "react";

import styles from './ProjectCard.module.css';

// import {BsPencil, BsFillTrashFill} from 'react-icons/bs';
 

const ProjectCard = ( {id, name, budget, category, handleRemove} ) => {
    return (
        <div className={styles.card}>
            <h4>{name}</h4>
            <p>
                <span>Budget:</span> R$ { budget }
            </p>
            <p>
                <span></span> R$ { category }
            </p>
            <div>
                <p>Edit</p>
                <p>Remove</p>
            </div>
        </div>
    )
}

export default ProjectCard;