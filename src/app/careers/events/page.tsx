"use client";
import React from 'react';
import styles from './events.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const timelineEvents = [
  {
    date: 'June 2024',
    title: 'Annual Careers Fair',
    description: 'Our flagship careers event connecting Muslim STEM professionals with leading employers',
    status: 'upcoming'
  },
  {
    date: 'April 2024',
    title: 'Tech Industry Panel',
    description: 'Muslim professionals in tech sharing their career journeys',
    status: 'upcoming'
  },
  {
    date: 'March 2024',
    title: 'Interview Skills Workshop',
    description: 'Practical tips for acing technical and behavioral interviews',
    status: 'past'
  },
  // Add more events...
];
const topRowLogos = [
  'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
  'https://media-publications.bcg.com/BCG_MONOGRAM.png',
  'https://download.logo.wine/logo/McKinsey_%26_Company/McKinsey_%26_Company-Logo.wine.png',
  // Duplicate for infinite scroll
  'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
  'https://media-publications.bcg.com/BCG_MONOGRAM.png',
  'https://download.logo.wine/logo/McKinsey_%26_Company/McKinsey_%26_Company-Logo.wine.png'
];

const bottomRowLogos = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkntvIMcHtbfVhPtNKbIeN5YMYFvJTSX5Ng&s',
  'https://cur8.capital/wp-content/uploads/2023/06/cur8.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
  'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
  // Duplicate for infinite scroll
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkntvIMcHtbfVhPtNKbIeN5YMYFvJTSX5Ng&s',
  'https://cur8.capital/wp-content/uploads/2023/06/cur8.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
  'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png'
];



export default function EventsPage() {
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className={styles.eventsContainer}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Career Events</h1>
          <p>Join us for professional development, networking, and opportunities</p>
        </div>
      </section>

      <section className={styles.featuredEvents}>
        <div className={styles.container}>
          <h2>Featured Events</h2>
          <div className={styles.eventCards}>
            <div className={styles.featuredCard}>
              <Image 
                src="/careers/careersfair.jpg" 
                alt="STEM Muslims Careers Fair" 
                width={500} 
                height={300}
                className={styles.eventImage}
              />
              <div className={styles.eventContent}>
                <div className={styles.eventDate}>June 17, 2023 • 6:00 PM</div>
                <h3>Annual Careers Fair</h3>
                <p>Our flagship careers event connecting Muslim STEM professionals with leading employers</p>
                <Link href="/careers/events/careers-fair" className={styles.eventButton}>
                  Event Details
                </Link>
              </div>
            </div>
            
            <div className={styles.featuredCard}>
              <Image 
                src="/careers/careersfair3.jpg" 
                alt="STEM Muslims Hackathon" 
                width={500} 
                height={300}
                className={styles.eventImage}
              />
              <div className={styles.eventContent}>
                <div className={styles.eventDate}>Coming Soon</div>
                <h3>STEM Hackathon</h3>
                <p>A collaborative coding event to solve real-world problems and showcase your skills</p>
                <Link href="/careers/events/hackathon" className={styles.eventButton}>
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* 
      <section className={styles.timeline} ref={timelineRef}>
        <div className={styles.container}>
          <h2>Event Timeline</h2>
          <div className={`${styles.timelineWrapper} ${timelineInView ? styles.animate : ''}`}>
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`${styles.timelineItem} ${styles[event.status]}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.date}>{event.date}</span>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className={styles.partners}>
        <div className={styles.container}>
          <h2>Our Partners</h2>
          <div className={styles.logoMarquee}>
            <div className={styles.track}>
              {topRowLogos.map((logo, index) => (
                <div key={`top-${index}`} className={styles.logoItem}>
                  <Image
                    src={logo}
                    alt="Partner logo"
                    width={120}
                    height={40}
                    style={{ opacity: 0.9 }}
                  />
                </div>
              ))}
            </div>
            <div className={`${styles.track} ${styles.reverse}`}>
              {bottomRowLogos.map((logo, index) => (
                <div key={`bottom-${index}`} className={styles.logoItem}>
                  <Image
                    src={logo}
                    alt="Partner logo"
                    width={120}
                    height={40}
                    style={{ opacity: 0.6 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 