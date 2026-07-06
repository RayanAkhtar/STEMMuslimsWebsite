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

// Define sections (display order)
const sections = [
    { id: "leadership", title: "Leadership" },
    { id: "vice-presidents", title: "Vice Presidents" },
    { id: "secretaries", title: "Secretaries" },
    { id: "tech", title: "Tech Leads" },
    { id: "careers", title: "Careers" },
    { id: "education", title: "Education" },
    { id: "outreach", title: "Outreach" },
    { id: "publicity", title: "Publicity & SM" },
    { id: "treasury", title: "Treasury & Sponsorship" },
    { id: "general", title: "General Committee" },
    // additional sections kept for prior years' data
    { id: "events", title: "Events Team" },
    { id: "academic", title: "Academic Team" },
    { id: "how", title: "House of Wisdom" },
    { id: "haqqathon", title: "Haqqathon Team" },
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
    const pillRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});


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
    const haqqathonTeam = Object.entries(members).filter(([_, details]) => details.role.includes("Haqqathon"));
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
        haqqathon: haqqathonTeam,
        freshers: fresherReps,
    };

    const is2024 = selectedFile.startsWith('2024');

    // Year-specific title tweaks (2024-25 had a single tech lead)
    const displaySections = is2024
        ? sections.map(s => (s.id === 'tech' ? { ...s, title: 'Tech Lead' } : s))
        : sections;

    // Precompute which sections have members
    const availableSections = displaySections.filter(s => (sectionEntries[s.id] && sectionEntries[s.id].length > 0));

    // Small sections that share a row on desktop (per year)
    const rowGroups: string[][] = is2024
        ? [["secretaries", "tech"], ["how", "academic"], ["outreach", "events"]]
        : [["secretaries", "tech"], ["careers", "education", "outreach"]];

    const sectionRows: Array<typeof availableSections> = [];
    const placed = new Set<string>();
    for (const section of availableSections) {
        if (placed.has(section.id)) continue;
        const group = rowGroups.find(g => g.includes(section.id));
        const row = group ? group.flatMap(id => availableSections.filter(s => s.id === id)) : [section];
        row.forEach(s => placed.add(s.id));
        sectionRows.push(row);
    }

    // Track which section is in view so the pill bar can highlight it
    useEffect(() => {
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

    // Keep the active pill visible by scrolling only the bar itself,
    // never the window (scrollIntoView would also scroll the page)
    useEffect(() => {
        const pill = pillRefs.current[activeSection];
        const bar = pill?.parentElement;
        if (pill && bar) {
            bar.scrollTo({
                left: pill.offsetLeft - (bar.clientWidth - pill.clientWidth) / 2,
                behavior: 'smooth'
            });
        }
    }, [activeSection]);

    const scrollToSection = (id: string) => {
        const element = sectionRefs.current[id];
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 140,
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
            
            <div className={styles.section_nav}>
                <div className={styles.section_nav_inner}>
                    {availableSections.map(section => (
                        <button
                            key={section.id}
                            ref={(el) => { pillRefs.current[section.id] = el }}
                            className={`${styles.section_pill} ${activeSection === section.id ? styles.active_pill : ''}`}
                            onClick={() => scrollToSection(section.id)}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.content_wrapper}>
                <div className={styles.main_content}>
                    {sectionRows.map(row => (
                        <div key={row[0].id} className={styles.section_row}>
                            {row.map(section => {
                                const entries = sectionEntries[section.id] || [];
                                const isLeadership = section.id === 'leadership';
                                return (
                                    <div
                                        key={section.id}
                                        ref={(el) => { sectionRefs.current[section.id] = el }}
                                        id={section.id}
                                        className={styles.section}
                                    >
                                        <h2 className={styles.section_title}>{section.title}</h2>
                                        <div className={isLeadership ? styles.committee_head : `${styles.committee_members} ${section.id === 'freshers' ? styles.centered_members : ''}`}>
                                            {entries.map(([name, details]) => (
                                                <MemberCard
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
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const getInitials = (name: string) =>
    name
        .split(' ')
        .filter(Boolean)
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

const MemberCard: React.FC<HeadMemberProps> = ({ name, role, year, course, email, linkedin }) => {
    return (
        <div className={styles.member}>
            <div className={styles.info_div}>
                <div className={styles.avatar} aria-hidden="true">{getInitials(name)}</div>
                <p className={styles.member_name}>{name}</p>
                <p className={styles.member_role}>{role}</p>
                <p className={styles.member_meta}>
                    {year} Year {course}
                </p>
                <div className={styles.card_contact}>
                    <span className={styles.contact_label}>Get in Touch</span>
                    <div className={styles.icons}>
                        <MailButton email={email} />
                        {linkedin && <LinkedInButton linkedin={linkedin} />}
                    </div>
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
