import React from 'react';
import styles from './contact.module.scss';
import { StemmEmail } from '@/lib/globalVariables';
import { StemmInsta } from '@/lib/globalVariables';
import { ISocFB } from '@/lib/globalVariables';
import Link from 'next/link';

export default function ContactUs() {
    return (
        <div className={styles.containerContact}>
            <div className={styles.contactBackground}>
                <div className={styles.headerBanner}>
                    <h1 className={styles.header}>CONTACT US</h1>
                    <p className={styles.subheader}>Follow us on our socials!</p>
                </div>

                <div className={styles.feedbackButtons}>
                    <a href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=B3WJK4zudUWDC0-CZ8PTB26IqARTk7dGgITo0xOZoitUMzU3QjI2U1I1UFIxU0dYQzM4UTJPUTBaWS4u" 
                       className={styles.feedbackButton} target="_blank" rel="noopener noreferrer">
                        Website Issues?
                    </a>
                    <a href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=B3WJK4zudUWDC0-CZ8PTB26IqARTk7dGgITo0xOZoitUMVNMTDJGTDg0RkxNRVZZWk1QMlQzSzY0US4u" 
                       className={styles.feedbackButton} target="_blank" rel="noopener noreferrer">
                        Website Additions?
                    </a>
                </div>
            </div>

            <div className={styles.whiteSection}> 
                <div>
                    <h2 className={styles.rightHeading}>Get in Touch</h2>
                    <p className={styles.message}>
                        For any inquiries, suggestions, or collaborations, feel free to send us a DM or email!!
                    </p>

                    <div className={styles.emailsect}>
                        <Link href="/outreach/contact" className={styles.emailButton}>
                            Schools interested in outreach?
                        </Link>
                    </div>

                    <a href="mailto:stemmuslims@hotmail.com" className={`${styles.emailButton} ${styles.redirectButton}`}>
                        Click to send us an email!
                    </a>
                </div>
            </div>

            <div className={styles.container_socialMedia}>
                <h2 className={styles.header}>Our Socials</h2>
                <div className={styles.socialIcons}>
                    <a href="https://www.instagram.com/stem.muslims/" target="_blank" rel="noopener noreferrer">
                        <div className={styles.socialMediaBox}>
                            <img src="/socials-icon/instagram.png" alt="Instagram" className={styles.icon} />
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/company/stem-muslims-imperial-college-london" target="_blank" rel="noopener noreferrer">
                        <div className={styles.socialMediaBox}>
                            <img src="/socials-icon/linkedin.png" alt="LinkedIn" className={styles.icon} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}