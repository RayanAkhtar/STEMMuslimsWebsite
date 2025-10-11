import styles from "./home.module.scss";

export default function SocialMedia() {
    const socialMediaLinks = [
        {
            icon: "home-images/ig-logo.svg",
            label: "Instagram",
            link: "https://www.instagram.com/stem.muslims/",
        },
        {
            icon: "home-images/linkedin-logo.svg", 
            label: "LinkedIn",
            link: "https://www.linkedin.com/company/stem-muslims-imperial-college-london/",
        },
        {
            icon: "home-images/linktree-logo.svg",
            label: "Custom",
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
                            <img src={icon} alt={label} className={styles.icon} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
