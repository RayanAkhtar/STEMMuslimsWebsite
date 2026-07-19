"use client";

import styles from "./home.module.scss";
import Image from "next/image";
import Link from "next/link";

const Intro = () => {
    const salaamImage = "/home-images/salaam.svg";

    return (
        <section className={styles.container_intro}>
            <div className={styles.heroInner}>
                {/* Salaam calligraphy accent */}
                <div className={styles.salaamImage}>
                    <Image
                        src={salaamImage}
                        alt="Assalaamu Alaykum wa Rahmatullahi wa Barakaatahu"
                        width={340}
                        height={285}
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
                    A community for Muslims at Imperial to achieve Ihsaan in
                    their studies, careers and lives.
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
        </section>
    );
};

export default Intro;
