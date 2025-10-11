"use client" // needed to render the icons
import { useEffect, useState, useRef } from 'react';
import styles from './committee.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import committee from "@/lib/committees/2024-2025.json";

interface MemberDetails {
    role: string;
    course: string;
    year: string;
    email: string;
    LinkedIn: string;
}

interface PeopleDetails {
    [key: string]: MemberDetails;
}

interface HeadMemberProps {
    name: string
    role: string;
    year: string;
    course: string;
    email: string;
    linkedin: string;
}

interface ComMemberProps extends HeadMemberProps {}

interface MailButtonProps {
    email: string;
}

interface LinkedInButtonProps {
    linkedin: string;
}

// Define sections for navigation
const sections = [
    { id: "leadership", title: "Leadership" },
    { id: "vice-presidents", title: "Vice Presidents" },
    { id: "secretaries", title: "Secretaries" },
    { id: "events", title: "Events Team" },
    { id: "academic", title: "Academic Team" },
    { id: "how", title: "House of Wisdom" },
    { id: "outreach", title: "Outreach" },
    { id: "publicity", title: "Publicity & SM" },
    { id: "treasury", title: "Treasury & Sponsorship" },
    { id: "tech", title: "Tech Team" },
    { id: "general", title: "General Committee" },
    { id: "freshers", title: "Fresher Representatives" }
];

const CommitteePage: React.FC = () => {
    const heads = committee.heads as PeopleDetails;
    const members = committee.members as PeopleDetails;
    const [activeSection, setActiveSection] = useState("leadership");
    const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
    
    // Group members by their roles
    const vicePresidents = Object.entries(members).filter(([_, details]) => details.role.includes("Vice President"));
    const secretaries = Object.entries(members).filter(([_, details]) => details.role.includes("Secretary"));
    const eventsTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Events"));
    const academicTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Academic"));
    const houseOfWisdom = Object.entries(members).filter(([_, details]) => details.role.includes("House of Wisdom"));
    const outreachTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Outreach"));
    const publicityTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Publicity"));
    const treasuryTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Treasury"));
    const techTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Tech"));
    const generalCommittee = Object.entries(members).filter(([_, details]) => details.role.includes("General"));
    const fresherReps = Object.entries(members).filter(([_, details]) => details.role.includes("Fresher"));

    // Scroll event handler to update active section
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            
            for (const id of sections.map(section => section.id)) {
                const element = sectionRefs.current[id];
                if (!element) continue;
                
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    setActiveSection(id);
                    break;
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = sectionRefs.current[id];
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles.committee_page}>
            <div className={styles.header}>
                <p>Meet Our Committee 2024/25!</p>
            </div>
            
            <div className={styles.content_wrapper}>
                <div className={styles.side_nav}>
                    <div className={styles.nav_container}>
                        {sections.map(section => (
                            <div 
                                key={section.id}
                                className={`${styles.nav_item} ${activeSection === section.id ? styles.active : ''}`}
                                onClick={() => scrollToSection(section.id)}
                            >
                                {section.title}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className={styles.main_content}>
                    <div ref={(el) => { sectionRefs.current['leadership'] = el }} id="leadership" className={styles.section}>
                        <h2 className={styles.section_title}>Leadership</h2>
                        <div className={styles.committee_head}>
                            {Object.entries(heads).map(([name, details]) => (
                                <HeadMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['vice-presidents'] = el }} id="vice-presidents" className={styles.section}>
                        <h2 className={styles.section_title}>Vice Presidents</h2>
                        <div className={styles.committee_members}>
                            {vicePresidents.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['secretaries'] = el }} id="secretaries" className={styles.section}>
                        <h2 className={styles.section_title}>Secretaries</h2>
                        <div className={styles.committee_members}>
                            {secretaries.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['events'] = el }} id="events" className={styles.section}>
                        <h2 className={styles.section_title}>Events Team</h2>
                        <div className={styles.committee_members}>
                            {eventsTeam.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['academic'] = el }} id="academic" className={styles.section}>
                        <h2 className={styles.section_title}>Academic Team</h2>
                        <div className={styles.committee_members}>
                            {academicTeam.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['how'] = el }} id="how" className={styles.section}>
                        <h2 className={styles.section_title}>House of Wisdom</h2>
                        <div className={styles.committee_members}>
                            {houseOfWisdom.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['outreach'] = el }} id="outreach" className={styles.section}>
                        <h2 className={styles.section_title}>Outreach Team</h2>
                        <div className={styles.committee_members}>
                            {outreachTeam.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['publicity'] = el }} id="publicity" className={styles.section}>
                        <h2 className={styles.section_title}>Publicity & Social Media</h2>
                        <div className={styles.committee_members}>
                            {publicityTeam.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['treasury'] = el }} id="treasury" className={styles.section}>
                        <h2 className={styles.section_title}>Treasury & Sponsorship</h2>
                        <div className={styles.committee_members}>
                            {treasuryTeam.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['tech'] = el }} id="tech" className={styles.section}>
                        <h2 className={styles.section_title}>Tech Team</h2>
                        <div className={styles.committee_members}>
                            {techTeam.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['general'] = el }} id="general" className={styles.section}>
                        <h2 className={styles.section_title}>General Committee</h2>
                        <div className={styles.committee_members}>
                            {generalCommittee.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={(el) => { sectionRefs.current['freshers'] = el }} id="freshers" className={styles.section}>
                        <h2 className={styles.section_title}>Fresher Representatives</h2>
                        <div className={styles.committee_members}>
                            {fresherReps.map(([name, details]) => (
                                <ComMember
                                    key={name}
                                    name={name}
                                    role={details.role}
                                    course={details.course}
                                    year={details.year}
                                    email={details.email}
                                    linkedin={details.LinkedIn}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeadMember: React.FC<HeadMemberProps> = ({ name, role, year, course, email, linkedin }) => {
    return (
        <div className={styles.member}>
            <div className={styles.info_div}>
                <p className={styles.member_name}>{name}</p>
                <hr />
                <p className={styles.member_role}>{role}</p>
                <p>
                    {year} Year {course}
                </p>
                <br />
                <b>Get in Touch</b>
                <div className={styles.icons}>
                    <MailButton email={email} />
                    {linkedin && <LinkedInButton linkedin={linkedin} />}
                </div>
            </div>
        </div>
    );
};

const ComMember: React.FC<ComMemberProps> = ({ name, role, year, course, email, linkedin }) => {
    return (
        <div className={styles.member}>
            <div className={styles.info_div}>
                <p className={styles.member_name}>{name}</p>
                <hr />
                <p className={styles.member_role}>{role}</p>
                <p>
                    {year} Year {course}
                </p>
                <br />
                <b>Get in Touch</b>
                <div className={styles.icons}>
                    <MailButton email={email} />
                    {linkedin && <LinkedInButton linkedin={linkedin} />}
                </div>
            </div>
        </div>
    );
};

const MailButton: React.FC<MailButtonProps> = ({ email }) => {
    return (
        <Link href={`mailto:${email}`}>
            <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
        </Link>
    );
};

const LinkedInButton: React.FC<LinkedInButtonProps> = ({ linkedin }) => {
    return (
        <Link href={linkedin} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className={styles.icon} icon={faLinkedin} />
        </Link>
    );
};

export default CommitteePage;
