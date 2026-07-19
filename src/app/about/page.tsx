import Link from "next/link";
import Image from "next/image";

import Intro from "./intro";
import UpcomingEvents from "./upcomingEvents";
import Stats from "./stats";
import SocialMedia from "./socialMedia";
import PrayerRoomsServer from "./prayerRooms";

import styles from "./about.module.scss";

type Stream = {
    name: string;
    href: string;
    caption: string;
    text: string;
    points: string[];
    images: string[];
    eventTitle: string;
};

const streams: Stream[] = [
    {
        name: "Careers",
        href: "/careers",
        caption: "Empowering Future Leaders in STEMM",
        text: "Our career-focused initiatives equip students with the skills and networks they need to enter and excel in their chosen fields.",
        points: ["Professional Development Workshops", "Career Events", "Networking Events"],
        images: ["/careers/careersfair.jpg", "/careers/careersfair2.jpg"],
        eventTitle: "Annual Careers Fair",
    },
    {
        name: "Education",
        href: "/education",
        caption: "Supporting Academic Success in STEMM",
        text: "Through tailored mentorship and resources, we aim to foster academic excellence and smooth the transition for Muslim students in STEM fields.",
        points: ["Tutorials", "Skill-building workshops", "Department WhatsApp GCs", "House Of Wisdom"],
        images: ["/education/beyond-borders/image1.jpeg", "/education/beyond-borders/image2.jpeg"],
        eventTitle: "Beyond Borders",
    },
    {
        name: "Outreach",
        href: "/outreach",
        caption: "Inspiring Future Generations and Building Community",
        text: "We're committed to fostering a culture of knowledge-sharing and service through outreach and community initiatives.",
        points: ["STEMM Day", "UCAS Mentoring Scheme", "Community Engagement and Upliftment"],
        images: ["/Outreach/stemday/making_car_2.webp", "/Outreach/stemday/flight_sim_2.webp"],
        eventTitle: "STEM Day",
    },
];

export default function AboutPage() {
    return (
        <div>
            {/* Hero: welcome, headline and mission card */}
            <Intro />

            {/* Who we are + the three streams */}
            <div className={styles.container_page} id="what-we-do">
                <div className={styles.container_who_we_are}>
                    <div className={styles.title}>
                        <h1>Who we are and what we do.</h1>
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
                <div className={styles.container_streams}>
                    {streams.map((stream) => (
                        <section className={styles.stream} key={stream.name}>
                            <Link href={stream.href} className={styles.stream_title}>
                                <h1>{stream.name}</h1>
                            </Link>

                            <div className={styles.stream_caption}>{stream.caption}</div>

                            <div className={styles.stream_text}>{stream.text}</div>

                            <div className={styles.stream_points}>
                                <ul>
                                    {stream.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.stream_images}>
                                {stream.images.map((img) => (
                                    <Image
                                        key={img}
                                        src={img}
                                        alt={`${stream.name} — ${stream.eventTitle}`}
                                        width={640}
                                        height={260}
                                        sizes="(max-width: 640px) 92vw, 470px"
                                    />
                                ))}
                            </div>

                            <div className={styles.stream_event}>{stream.eventTitle}</div>
                        </section>
                    ))}
                </div>
            </div>

            {/* Events, stats, socials and prayer rooms */}
            <UpcomingEvents />
            <Stats />
            <SocialMedia />
            <PrayerRoomsServer />
        </div>
    );
}
