"use client";

import styles from "./landing.module.scss";
import Image from "next/image";
import Link from "next/link";

const Intro = () => {
    const salaamImage = "/home-images/salaam.svg";

    return (
        <section className={styles.container_intro}>
            <div className={styles.heroInner}>
                <div className={styles.heroGrid}>
                    <div className={styles.heroText}>
                        {/* Salaam calligraphy spanning the full line */}
                        <div className={styles.salaamImage}>
                            <Image
                                src={salaamImage}
                                alt="Assalaamu Alaykum wa Rahmatullahi wa Barakaatahu"
                                width={680}
                                height={570}
                                priority
                            />
                        </div>

                        <p className={styles.eyebrow}>
                            STEM Muslims &middot; Imperial College London
                        </p>

                        <h1 className={styles.heading}>
                            Uniting Muslim Minds,
                            <br />
                            Empowering Future Leaders
                        </h1>

                        <p className={styles.subheading}>
                            A community for Muslims at Imperial to achieve
                            Ihsaan in their studies, careers and lives.
                        </p>

                        <div className={styles.heroActions}>
                            <Link href="/contact" className={styles.heroCta}>
                                Get Involved
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <aside className={styles.missionCard}>
                        <p className={styles.missionLabel}>Our Mission</p>
                        <p className={styles.missionText}>
                            To build a thriving network of Muslim STEM students
                            at Imperial, fostering academic and professional
                            excellence while nurturing a values-driven community
                            rooted in Islamic principles to develop
                            tomorrow&apos;s leaders.
                        </p>
                        <a href="#what-we-do" className={styles.missionLink}>
                            What we do
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                            </svg>
                        </a>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Intro;
