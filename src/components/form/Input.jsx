import React from "react";

import styles from './Input.module.css';

const Input = ({ type, text, name, placeholder, handleOnChange, value }) => {
    return (
        <div className={styles.form_control}>
            <label
                htmlFor={name}>
                {text}:
            </label>
            <input
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange} />
        </div>
    )
}

export default Input;