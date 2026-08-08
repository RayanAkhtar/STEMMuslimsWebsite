"use client"
import { useEffect, useState, useRef } from 'react';
import styles from './committee.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import type { CommitteeData, MemberDetails } from '@/lib/committees';

interface HeadMemberProps {
    name: string
    role: string;
    year: string;
    course: string;
    email: string;
    linkedin: string;
}

interface MailButtonProps {
    email: string;
}

interface LinkedInButtonProps {
    linkedin: string;
}

interface YearLink {
    slug: string;
    label: string;
    current: boolean;
}

interface CommitteeViewProps {
    label: string;
    data: CommitteeData;
    years: YearLink[];
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
    { id: "stemnet", title: "STEMnet" },
    { id: "alumni", title: "Alumni Liaison" },
    { id: "publicity", title: "Publicity & SM" },
    { id: "social", title: "Social Media" },
    { id: "treasury", title: "Treasury & Sponsorship" },
    { id: "sponsorship", title: "Sponsorship" },
    { id: "general", title: "General Committee" },
    // additional sections kept for prior years' data
    { id: "events", title: "Events Team" },
    { id: "academic", title: "Academic Team" },
    { id: "how", title: "House of Wisdom" },
    { id: "haqqathon", title: "Haqqathon Team" },
    { id: "hackathon", title: "Hackathon" },
    { id: "freshers", title: "Fresher Representatives" }
];

const CommitteeView: React.FC<CommitteeViewProps> = ({ label, data, years }) => {
    const heads = data.heads || {};
    const members = data.members || {};
    const [activeSection, setActiveSection] = useState("leadership");
    const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
    const pillRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});

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
    const socialMediaTeam = Object.entries(members).filter(([_, details]) => (details.role || '').toLowerCase().includes('social media'));
    // "Treasurer" (2022-23) and "Treasury & Sponsorship Officer" (2024-25) share this section
    const treasuryTeam = Object.entries(members).filter(([_, details]) => {
        const role = (details.role || '').toLowerCase();
        return role.includes('treasury') || role.includes('treasurer');
    });
    const alumniTeam = Object.entries(members).filter(([_, details]) => (details.role || '').toLowerCase().includes('alumni'));
    // years that list sponsorship separately; "Treasury & Sponsorship" stays in its own section
    const sponsorshipTeam = Object.entries(members).filter(([_, details]) => {
        const role = (details.role || '').toLowerCase();
        return role.includes('sponsorship') && !role.includes('treasury');
    });
    const stemnetTeam = Object.entries(members).filter(([_, details]) => (details.role || '').toLowerCase().includes('stemnet'));
    const hackathonTeam = Object.entries(members).filter(([_, details]) => (details.role || '').toLowerCase().includes('hackathon'));
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
        stemnet: stemnetTeam,
        alumni: alumniTeam,
        publicity: publicityTeam,
        social: socialMediaTeam,
        treasury: treasuryTeam,
        sponsorship: sponsorshipTeam,
        tech: techTeam,
        general: generalCommittee,
        haqqathon: haqqathonTeam,
        hackathon: hackathonTeam,
        freshers: fresherReps,
    };

    const is2024 = label.startsWith('2024');
    const is2023 = label.startsWith('2023');
    const is2022 = label.startsWith('2022');
    const is2025 = label.startsWith('2025');

    // Year-specific title tweaks: 2024-25 had a single tech lead; 2022-23
    // listed sponsorship separately and had a single publicity head
    const titles2022: Record<string, string> = { treasury: 'Treasury', publicity: 'Publicity Head' };
    const displaySections = is2024
        ? sections.map(s => (s.id === 'tech' ? { ...s, title: 'Tech Lead' } : s))
        : is2022
        ? sections.map(s => (titles2022[s.id] ? { ...s, title: titles2022[s.id] } : s))
        : sections;

    // Precompute which sections have members
    const availableSections = displaySections.filter(s => (sectionEntries[s.id] && sectionEntries[s.id].length > 0));

    // Small sections that share a row on desktop (per year)
    const rowGroups: string[][] = is2024
        ? [["secretaries", "tech"], ["how", "academic"], ["outreach", "events"]]
        : is2023
        ? [["secretaries", "events"], ["academic", "general"], ["outreach", "stemnet", "hackathon"], ["publicity", "social", "sponsorship"]]
        : is2022
        ? [["secretaries", "events"], ["treasury", "sponsorship"], ["outreach", "alumni", "publicity"]]
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
        <div className={`${styles.committee_page} ${(is2022 || is2023) ? styles.retro : ''} ${is2022 ? styles.mono : ''} ${is2024 ? styles.transitional : ''} ${is2025 ? styles.heritage : ''}`}>
            <div className={styles.header}>
                <p>Meet Our Committee {label}</p>
                <div className={styles.file_buttons}>
                    {years.map(y => (
                        <Link
                            key={y.slug}
                            href={y.current ? '/committee' : `/committee/${y.slug}`}
                            className={`${styles.file_button} ${y.label === label ? styles.active_file : ''}`}
                        >
                            {y.label}
                        </Link>
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
    const meta = [year ? `${year} Year` : '', course].filter(Boolean).join(' ');
    return (
        <div className={styles.member}>
            <div className={styles.info_div}>
                <div className={styles.avatar} aria-hidden="true">{getInitials(name)}</div>
                <p className={styles.member_name}>{name}</p>
                <p className={styles.member_role}>{role}</p>
                {meta && <p className={styles.member_meta}>{meta}</p>}
                {(email || linkedin) && (
                    <div className={styles.card_contact}>
                        <span className={styles.contact_label}>Get in Touch</span>
                        <div className={styles.icons}>
                            {email && <MailButton email={email} />}
                            {linkedin && <LinkedInButton linkedin={linkedin} />}
                        </div>
                    </div>
                )}
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

export default CommitteeView;
