import React from "react";
import { useEffect, useState } from "react";

import styles from './Message.module.css';

const Message = ({ type, msg }) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(!msg) {
            setVisible(false)
            return //finish everythinh
        }

        setVisible(true) //if has msg, do all this stuff below

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer) //finishing the timer
    }, [msg])

    return (
        <>
            { visible && (
                <div className={`${styles.message} ${styles[type]}`}> {msg} </div>
            )}
        </>
    )
}

export default Message;