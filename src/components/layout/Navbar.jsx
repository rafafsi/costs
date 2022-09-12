import React from "react";
import { Link } from "react-router-dom";

import Container from "./Container";
import logo from "../../img/costs_logo.png"
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Costs" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Projects</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar;