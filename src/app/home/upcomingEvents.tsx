"use client";

import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";

type Event = {
    start: string;
    end: string;
    summary: string;
    description: string;
    location: string;
};

function formatDateWithSuffix(date: Date): string {
    const day = date.getDate();
    const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
        day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" : "th";
    const month = date.toDateString().split(" ")[1];
    const year = date.getFullYear();
    return `${month} ${day}${suffix} ${year}`;
}

export default function UpcomingEvents() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch("/api/calendar");
                const data: Event[] = await res.json();
                setEvents(data);
            } catch (err) {
                console.error("Error loading events", err);
            }
        }
        fetchEvents();
    }, []);

    return (
        <section className={styles.container_upcoming}>
            <h2 className={styles.upcomingTitle}>Upcoming Events</h2>
            {events.length > 0 ? (
                <ul className={styles.eventsTimeline}>
                    {events.map((event, index) => (
                        <li className={styles.eventItem} key={index}>
                            <div className={styles.eventDateBadge}>
                                {formatDateWithSuffix(new Date(event.start))}
                            </div>
                            <div className={styles.eventInfo}>
                                <h3>{event.summary}</h3>
                                {event.location && <p>{event.location.split(",")[0]}</p>}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noEvents}>No upcoming events found.</p>
            )}
        </section>
    );
}
