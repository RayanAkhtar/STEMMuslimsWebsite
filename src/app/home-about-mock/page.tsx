import Link from "next/link";

import Intro from "../home/intro";
import UpcomingEvents from "../home/upcomingEvents";
import Stats from "../home/stats";
import SocialMedia from "../home/socialMedia";
import PrayerRoomsServer from "../home/prayerRooms";
import Button from "../../components/button";

import homeStyles from "../home/home.module.scss";
import aboutStyles from "../about/about.module.scss";
import mockStyles from "./mock.module.scss";

export const metadata = {
    title: "Mock — Home + About | STEM Muslims",
    description: "Preview of the home and about pages merged into one.",
};

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

export default function HomeAboutMockPage() {
    return (
        <div>
            {/* --- From home: hero --- */}
            <Intro />

            {/* --- Merged mission: home's section, button now scrolls to the streams below --- */}
            <section className={homeStyles.container_mission}>
                <div className={homeStyles.missionGrid}>
                    <div className={homeStyles.missionIntro}>
                        <h2 className={homeStyles.missionHeading}>OUR MISSION</h2>
                        <Button label="What we do" href="#what-we-do" theme="primary" />
                    </div>
                    <div className={homeStyles.missionBody}>
                        <p>
                            To build a thriving network of Muslim STEM students at Imperial, fostering academic and professional excellence while nurturing a values-driven community rooted in Islamic principles to develop tomorrow&apos;s leaders.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- From about: who we are + the three streams --- */}
            <div className={aboutStyles.container_page} id="what-we-do">
                <div className={aboutStyles.container_who_we_are}>
                    <div className={aboutStyles.title}>
                        <h1>Who we are and what we do.</h1>
                    </div>
                    <div className={aboutStyles.desc}>
                        <p>
                            We are a university society dedicated to fostering a
                            supportive and empowering environment for Muslim
                            students pursuing degrees and careers in the fields of
                            STEM, all whilst championing Islamic values.
                        </p>
                    </div>
                    <div className={aboutStyles.desc}>
                        <p>
                            We aim to increase participation and guide Muslims to
                            excel in STEM degrees at Imperial University, then
                            beyond in their careers.
                        </p>
                    </div>
                    <div className={aboutStyles.desc}>
                        <p>
                            Our focus is on <span className={aboutStyles.inline_bold}>three key areas</span> :
                        </p>
                    </div>
                </div>
                <div className={aboutStyles.container_streams}>
                    {streams.map((stream) => (
                        <section className={aboutStyles.stream} key={stream.name}>
                            <Link href={stream.href} className={aboutStyles.stream_title}>
                                <h1>{stream.name}</h1>
                            </Link>

                            <div className={aboutStyles.stream_caption}>{stream.caption}</div>

                            <div className={aboutStyles.stream_text}>{stream.text}</div>

                            <div className={aboutStyles.stream_points}>
                                <ul>
                                    {stream.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={aboutStyles.stream_images}>
                                {stream.images.map((img) => (
                                    <img key={img} src={img} alt={`${stream.name} — ${stream.eventTitle}`} />
                                ))}
                            </div>

                            <div className={aboutStyles.stream_event}>{stream.eventTitle}</div>
                        </section>
                    ))}
                </div>
            </div>

            {/* --- From home: the rest --- */}
            <UpcomingEvents />
            <Stats />
            <SocialMedia />
            <PrayerRoomsServer />

            <div className={mockStyles.mockBadge}>Mock · Home + About merged</div>
        </div>
    );
}
