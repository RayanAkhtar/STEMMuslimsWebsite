"use client";

import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./home.module.scss";
import CountUp from "react-countup";

const statsData = [
    {
        number: 950,
        label: "Attendees",
        description: "developed their skills and expanded their networks",
    },
    {
        number: 15,
        label: "Events",
        description: "hosted, including the Haqqathon and Careers Fair",
    },
    {
        number: 10,
        label: "Tutorials",
        description: "delivered to enhance technical and academic skills",
    },
    {
        number: 60,
        label: "Mentees",
        description: "from Y12/Y13 supported through mentorship programs",
    },
];

export default function Stats() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.4,
    });

    return (
        <section ref={ref} className={styles.container_stats}>
            <h2 className={styles.title}>IN 2024...</h2>
            <div className={styles.statsContainer}>
                {statsData.map((stat, index) => (
                    <div key={index} className={styles.stat}>
                        <h3 className={styles.number}>
                            {inView ? (
                                <CountUp start={0} end={stat.number} duration={4} separator="," />
                            ) : (
                                0
                            )}
                            +
                        </h3>
                        <p className={styles.label}>{stat.label}</p>
                        <p className={styles.description}>{stat.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
