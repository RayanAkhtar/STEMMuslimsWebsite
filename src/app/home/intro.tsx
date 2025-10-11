"use client";

import styles from "./home.module.scss";
import Image from "next/image";

const Intro = () => {
    const salaamImage = "/home-images/salaam.svg";

    return (
        <div className={styles.container_intro}>
            {/* Salaam overlay */}
            <div className={styles.salaamImage}>
                <Image
                    src={salaamImage}
                    alt="Assalaamu Alaykum wa Rahmatullahi wa Barakaatahu"
                    width={700} 
                    height={100}
                    priority
                />
            </div>

            {/* Overlay text */}
            <div className={styles.overlay}>
                <h1 className={styles.heading}>Welcome to STEM Muslims</h1>
                <p className={styles.subheading}>
                    Uniting Muslim Minds, Empowering Future Leaders.
                </p>
            </div>
        </div>
    );
};

export default Intro;
