import React from "react";

import LinkButton from "../layout/LinkButton";

import styles from './Home.module.css';

import savings from './../../img/savings.svg';

const Home = () => {
    return (
        <section className={styles.home_container}>
            <h1>Welcome to <span>Costs</span></h1>
            <p>Start to manage your projects right now!</p>
            <LinkButton to="/newproject" text="Create Project"/>
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home;