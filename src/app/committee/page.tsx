"use client"
import { useEffect, useState, useRef } from 'react';
import styles from './committee.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
    { id: "tech", title: "Tech Team" },
    { id: "events", title: "Events Team" },
    { id: "academic", title: "Academic Team" },
    { id: "how", title: "House of Wisdom" },
    { id: "outreach", title: "Outreach" },
    { id: "publicity", title: "Publicity & SM" },
    { id: "treasury", title: "Treasury & Sponsorship" },
    { id: "careers", title: "Careers" },
    { id: "education", title: "Education" },
    { id: "general", title: "General Committee" },
    { id: "freshers", title: "Fresher Representatives" }
];

const CommitteePage: React.FC = () => {
    const [committeeData, setCommitteeData] = useState<{heads: PeopleDetails; members: PeopleDetails} | null>(null);
    const [availableFiles, setAvailableFiles] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState('2025-2026.json');

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/committees');
                const json = await res.json();
                if (json.files) {
                    setAvailableFiles(json.files);
                    if (!json.files.includes(selectedFile)) {
                        setSelectedFile(json.files[0]);
                    }
                }
            } catch (err) {
                console.error('Failed to load committee files', err);
            }
        };
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Prevent automatic scroll restoration on reload/navigation
    useEffect(() => {
        if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
            try {
                // prefer manual so browser doesn't restore scroll position
                (history as any).scrollRestoration = 'manual';
            } catch (e) {
                // ignore
            }
        }


    }, []);

    useEffect(() => {
        const loadFile = async () => {
            if (!selectedFile) return;
            try {
                const res = await fetch(`/api/committees?file=${encodeURIComponent(selectedFile)}`);
                if (!res.ok) {
                    console.error('Failed to fetch committee file', await res.text());
                    setCommitteeData(null);
                    return;
                }
                const data = await res.json();
                setCommitteeData({ heads: data.heads || {}, members: data.members || {} });
            } catch (err) {
                console.error('Failed to load committee data', err);
                setCommitteeData(null);
            }
        };
        loadFile();
    }, [selectedFile]);

    const heads = (committeeData && committeeData.heads) ? committeeData.heads : {} as PeopleDetails;
    const members = (committeeData && committeeData.members) ? committeeData.members : {} as PeopleDetails;
    const [activeSection, setActiveSection] = useState("leadership");
    const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
    
    // Group members by their roles
    const vicePresidents = Object.entries(members).filter(([_, details]) => details.role.includes("Vice President"));
    const secretaries = Object.entries(members).filter(([_, details]) => details.role.includes("Secretary"));
    const eventsTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Events"));
    const academicTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Academic"));
    const educationTeam = Object.entries(members).filter(([_, details]) => {
        const role = (details.role || '').toLowerCase();
        return role.includes('education') && !role.includes('vice president');
    });
    const houseOfWisdom = Object.entries(members).filter(([_, details]) => details.role.includes("House of Wisdom"));
    const outreachTeam = Object.entries(members).filter(([_, details]) => {
        const role = (details.role || '').toLowerCase();
        return role.includes('outreach') && !role.includes('vice president');
    });
    const publicityTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Publicity"));
    const treasuryTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Treasury"));
    const techTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Tech"));
    const careersTeam = Object.entries(members).filter(([_, details]) => {
        const role = (details.role || '').toLowerCase();
        return (role.includes('careers') || role.includes('career')) && !role.includes('vice president');
    });
    const generalCommittee = Object.entries(members).filter(([_, details]) => details.role.includes("General"));
    const fresherReps = Object.entries(members).filter(([_, details]) => details.role.includes("Fresher"));

    // Map section ids to their entries so we can hide empty sections
    const sectionEntries: {[key: string]: Array<[string, MemberDetails]>} = {
        leadership: Object.entries(heads),
    careers: careersTeam,
        'vice-presidents': vicePresidents,
        secretaries: secretaries,
        events: eventsTeam,
        academic: academicTeam,
    education: educationTeam,
        how: houseOfWisdom,
        outreach: outreachTeam,
        publicity: publicityTeam,
        treasury: treasuryTeam,
        tech: techTeam,
        general: generalCommittee,
        freshers: fresherReps,
    };

    // Precompute which sections have members
    const availableSections = sections.filter(s => (sectionEntries[s.id] && sectionEntries[s.id].length > 0));

    // Scroll event handler to update active section
    useEffect(() => {
        // If the current activeSection is not available, set it to the first available one
        if (availableSections.length > 0 && !availableSections.find(s => s.id === activeSection)) {
            setActiveSection(availableSections[0].id);
        }

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const id of availableSections.map(section => section.id)) {
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
    }, [availableSections, activeSection]);

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
                <p>Meet Our Committee {selectedFile ? selectedFile.replace('.json','') : ''}</p>
                <div className={styles.file_buttons}>
                    {availableFiles.map(f => (
                        <button
                            key={f}
                            className={`${styles.file_button} ${selectedFile === f ? styles.active_file : ''}`}
                            onClick={() => setSelectedFile(f)}
                        >
                            {f.replace('.json', '')}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className={styles.content_wrapper}>
                <div className={styles.side_nav}>
                    {/* Mobile: show a select dropdown instead of the horizontal scrollable pills */}
                    <select
                        className={styles.mobile_select}
                        aria-label="Navigate committee sections"
                        value={activeSection}
                        onChange={(e) => {
                            const id = e.target.value;
                            setActiveSection(id);
                            scrollToSection(id);
                        }}
                    >
                        {availableSections.map(section => (
                            <option key={section.id} value={section.id}>{section.title}</option>
                        ))}
                    </select>

                    <div className={styles.nav_container}>
                        {availableSections.map(section => (
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
                    {sectionEntries['leadership'] && sectionEntries['leadership'].length > 0 && (
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
                    )}

                    {sectionEntries['vice-presidents'] && sectionEntries['vice-presidents'].length > 0 && (
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
                    )}

                    {sectionEntries['secretaries'] && sectionEntries['secretaries'].length > 0 && (
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
                    )}

                    {sectionEntries['tech'] && sectionEntries['tech'].length > 0 && (
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
                    )}

                    {sectionEntries['events'] && sectionEntries['events'].length > 0 && (
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
                    )}

                    {sectionEntries['academic'] && sectionEntries['academic'].length > 0 && (
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
                    )}

                    {sectionEntries['how'] && sectionEntries['how'].length > 0 && (
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
                    )}

                    {sectionEntries['outreach'] && sectionEntries['outreach'].length > 0 && (
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
                    )}

                    {sectionEntries['publicity'] && sectionEntries['publicity'].length > 0 && (
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
                    )}

                    {sectionEntries['treasury'] && sectionEntries['treasury'].length > 0 && (
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
                    )}

                                        {sectionEntries['careers'] && sectionEntries['careers'].length > 0 && (
                        <div ref={(el) => { sectionRefs.current['careers'] = el }} id="careers" className={styles.section}>
                            <h2 className={styles.section_title}>Careers</h2>
                            <div className={styles.committee_members}>
                                {careersTeam.map(([name, details]) => (
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
                    )}

                    {sectionEntries['education'] && sectionEntries['education'].length > 0 && (
                        <div ref={(el) => { sectionRefs.current['education'] = el }} id="education" className={styles.section}>
                            <h2 className={styles.section_title}>Education</h2>
                            <div className={styles.committee_members}>
                                {educationTeam.map(([name, details]) => (
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
                    )}

                    {sectionEntries['general'] && sectionEntries['general'].length > 0 && (
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
                    )}

                    {sectionEntries['freshers'] && sectionEntries['freshers'].length > 0 && (
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
                    )}
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
