import React from "react";

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul className={styles.socialList}>
                <li className={styles.items}><FaFacebook /></li>
                <li className={styles.items}><FaInstagram /></li>
                <li className={styles.items}><FaLinkedin /></li>
            </ul>
            <p className={styles.copy_right}><span>Costs</span> &copy; 2022</p>
        </footer>
    )
}

export default Footer;