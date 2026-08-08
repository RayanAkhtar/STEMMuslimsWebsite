import styles from "./landing.module.scss";

export default function SocialMedia() {
    const socialMediaLinks = [
        {
            icon: "/home/ig-logo.svg",
            label: "Instagram",
            link: "https://www.instagram.com/stem.muslims/",
        },
        {
            icon: "/home/linkedin-logo.svg", 
            label: "LinkedIn",
            link: "https://www.linkedin.com/company/stem-muslims-imperial-college-london/",
        },
        {
            icon: "/home/linktree-logo.svg",
            label: "Linktree",
            link: "https://linktr.ee/stemmuslims",
        },
    ];

    return (
        <div className={styles.container_socialMedia}>
            <h2 className={styles.heading}>CONTACT US</h2>
            <p className={styles.subheading}>
                Want to keep in touch? Follow us on social media for the latest updates and news!
            </p>
            <div className={styles.socialMediaContainer}>
                {socialMediaLinks.map(({ icon, label, link }) => (
                    <a
                        href={link}
                        key={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialMediaBox}
                    >
                        <div className={styles.iconBackground}>
                            {/* decorative: the visible label carries the meaning */}
                            <img src={icon} alt="" className={styles.icon} />
                        </div>
                        <span className={styles.socialLabel}>{label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
