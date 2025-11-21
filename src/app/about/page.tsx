'use client';

import React, { useEffect, useState } from 'react';
import styles from './about.module.scss';

type Event = {
    start: string;
    end: string;
    summary: string;
    description: string;
};

export default function About() {
    const [events, setEvents] = useState<Event[]>([]);

    function formatDateWithSuffix(date: Date): string {
        const day = date.getDate();
        const suffix =
            day % 10 === 1 && day !== 11 ? 'st' :
            day % 10 === 2 && day !== 12 ? 'nd' :
            day % 10 === 3 && day !== 13 ? 'rd' : 'th';
        const month = date.toDateString().split(' ')[1];
        const year = date.getFullYear();
        return `${month} ${day}${suffix} ${year}`;
    }

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch('/api/calendar');
                const data: Event[] = await res.json();
                console.log(data);
                setEvents(data);
            } catch (err) {
                console.error("Error loading events", err);
            }
        }

        fetchEvents();
    }, []);

    return (
        <>
            <div className={styles.container_page}>
                <div className={styles.container_mission}>
                    <div className={styles.title}>
                        <h1>Our Mission.</h1>
                    </div>
                    <div className={styles.desc}>
                        <p>
                        To support the Muslim community at Imperial College 
                        London in achieving their academic and professional 
                        goals and guide the next generation to be the next 
                        future leaders.
                        </p>
                    </div>
                </div>
                <div className={styles.container_who_we_are}>
                    <div className={styles.title}>
                        <h1>Who we are and what do we do.</h1>
                    </div>
                    <div className={styles.desc}>
                        <p>
                        We are a university society dedicated to fostering a 
                        supportive and empowering environment for Muslim 
                        students pursuing degrees and careers in the fields of 
                        STEM, all whilst championing Islamic values. 
                        </p>
                    </div>
                    <div className={styles.desc}>
                        <p>
                        We aim to increase participation and guide Muslims to 
                        excel in STEM degrees at Imperial University, then 
                        beyond in their careers.
                        </p>
                    </div>
                    <div className={styles.desc}>
                        <p>
                        Our focus is on <span className={styles.inline_bold}>three key areas</span> :
                        </p>
                    </div>
                </div>
                <div className={styles.container_key_areas}>
                    
                    <div className={styles.key_area}>

                        <div className={styles.key_area_title}>
                            <h1>Careers</h1>
                        </div>

                        <div className={styles.key_area_caption}>
                            Empowering Future Leaders in STEMM
                        </div>

                        <div className={styles.key_area_text}>
                            Our career-focused initiatives equip students with the skills and networks they need to enter and excel in their chosen fields.
                        </div>

                        <div className={styles.key_area_points}>
                            <ul>
                                <li>Professional Development Workshops</li>
                                <li>Career Events</li>
                                <li>Networking Events</li>
                            </ul>
                        </div>

                    </div>

                    <div className={styles.key_area}>

                        <div className={styles.key_area_title}>
                            <h1>Education</h1>
                        </div>

                        <div className={styles.key_area_caption}>
                            Supporting Academic Success in STEMM
                        </div>

                        <div className={styles.key_area_text}>
                            Through tailored mentorship and resources, we aim to foster academic excellence and smooth the transition for Muslim students in STEM fields.
                        </div>

                        <div className={styles.key_area_points}>
                            <ul>
                                <li>Tutorials</li>
                                <li>Skill-building workshops</li>
                                <li>Department WhatsApp GCs</li>
                                <li>House Of Wisdom</li>
                            </ul>
                        </div>

                    </div>

                    <div className={styles.key_area}>

                        <div className={styles.key_area_title}>
                            <h1>Outreach</h1>
                        </div>

                        <div className={styles.key_area_caption}>
                            Inspiring Future Generations and Building Community 
                        </div>

                        <div className={styles.key_area_text}>
                            We're committed to fostering a culture of knowledge-sharing and service through outreach and community initiatives.
                        </div>

                        <div className={styles.key_area_points}>
                            <ul>
                                <li>STEMM Day</li>
                                <li>UCAS Mentoring Scheme</li>
                                <li>Community Engagement and Upliftment</li>
                            </ul>
                        </div>

                    </div>

                </div>

                <div className={styles.container_timeline}>
                    <h2 className={styles.timelineHeader}>Upcoming Events</h2>
                    {events.length > 0 ? (
                        <ul className={styles.events_block}>
                            {events.map((event, index) => (
                                <div className={styles.event} key={index}>
                                    <h1>{formatDateWithSuffix(new Date(event.start))} | {event.summary}</h1>
                                    <p>{event.location.split(",")[0]}</p>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming events found.</p>
                    )}
                </div>
            </div>
        </>
    )
}