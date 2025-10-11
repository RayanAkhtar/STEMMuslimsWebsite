import Link from 'next/link'
import styles from './about.module.scss'

export default function About() {
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
                    <h1>Timeline of events: </h1>
                    <div className={styles.events_block}>
                        <div className={styles.event}>
                            <h1>Oct 26th 2025 | Muslims in AI Networking Event</h1>
                            <p>
                            Jointly hosted by the Muslim Researchers' Network (MRN) and STEM Muslims 
                            Imperial College London, this event is designed to bring together Muslim 
                            researchers, students, academics, and professionals who share a passion for 
                            Artificial Intelligence, in a relaxed and welcoming environment. Whether 
                            you're deep into research or just getting started, this is your chance to 
                            connect, learn, and collaborate. 
                            </p>
                        </div>
                        <div className={styles.event}>
                            <h1>Nov 15th 2024 | Startup Showcase</h1>
                            <p>
                            Discover 10 Student Startups. Get inspired by innovative ideas from fellow 
                            students who are ready to make an impact. This is your chance to support 
                            the next wave of changemakers. Meet experienced entrepreneurs and mentors 
                            who can guide your journey. Build connections that could shape your future. 
                            Participate in panels exploring the challenges and opportunities in 
                            entrepreneurship. Exchange ideas and learn from those in industry.
                            </p>
                        </div>
                        <div className={styles.event}>
                            <h1>Dec 13th 2023 | Year 10/11 Science Competition</h1>
                            <p>
                            A day full of competitions involving Mathematics, Science and engineering problems. Students compete in teams of 4. 
                            </p>
                        </div>
                        <div className={styles.event}>
                            <h1>Jan 11th 2025 | Consulting Masterclass</h1>
                            <p>
                            Interview preperation, case study workshops and personalized feedback 
                            </p>
                        </div>
                        <div className={styles.event}>
                            <h1>Jan 25th 2025 | Working Abroad Webinar</h1>
                            <p>
                            Hear from inspiring Muslim professionals from Dubai, Singapore, Abu Dhabi, and Saudi Arabia! 
                            Gain insights into their career journeys, learn how to succeed internationally, and ask your 
                            questions live.
                            </p>
                        </div>
                        <div className={styles.event}>
                            <h1>Feb 4th 2025 | Nester Talk</h1>
                            <p>
                            Join Youness Abidou, CEO of Nester, for an insightful evening on Islamic 
                            Finance!
                            </p>
                        </div>
                        <div className={styles.event}>
                            <h1>Feb 12th 2025 | Robotics Day</h1>
                            <p>
                            idek
                            </p>
                        </div>
                        <div className={styles.event}>
                            <h1>Feb 19th 2025 | Engineering STEMM Day</h1>
                            <p>
                            idek
                            </p>
                        </div>
                        <div className={styles.event}>
                            <h1>Feb 26th 2025 | Life Sciences STEMM Day</h1>
                            <p>
                            Inviting prospective Year 12 students to Imperial for a day of lab tours and 
                            exciting workshops, as well as exclusive application guidance & tips! 
                            </p>
                        </div>
                        <div className={styles.event}>
                            <h1>Coming soon in the summer... | Careers Fair and Hackathon</h1>
                            <p>
                            idek 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}