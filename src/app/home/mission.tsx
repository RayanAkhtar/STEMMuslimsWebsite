"use client";

import styles from "./home.module.scss";
import Button from "../../components/button";

export default function Mission() {
    return (
        <div className={styles.container_mission}>
            <div className={styles.rightSection}>
                <h2 className={styles.rightHeading}>OUR MISSION</h2>
                <p className={styles.rightText}>
                    To build a thriving network of Muslim STEM students at Imperial, fostering academic and professional excellence while nurturing a values-driven community rooted in Islamic principles to develop tomorrow's leaders.
                </p>
                <Button
                    label="Read more" 
                    href={"/about"}
                    theme="primary"
                />
            </div>
        </div>
    );
}
