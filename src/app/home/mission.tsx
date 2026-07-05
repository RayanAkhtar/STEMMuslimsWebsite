"use client";

import styles from "./home.module.scss";
import Button from "../../components/button";

export default function Mission() {
    return (
        <section className={styles.container_mission}>
            <div className={styles.missionGrid}>
                <div className={styles.missionIntro}>
                    <h2 className={styles.missionHeading}>OUR MISSION</h2>
                    <Button
                        label="Read more"
                        href={"/about"}
                        theme="primary"
                    />
                </div>
                <div className={styles.missionBody}>
                    <p>
                        To build a thriving network of Muslim STEM students at Imperial, fostering academic and professional excellence while nurturing a values-driven community rooted in Islamic principles to develop tomorrow&apos;s leaders.
                    </p>
                </div>
            </div>
        </section>
    );
}
