"use client";
import React from 'react';
import styles from './careers.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartDataPoint {
  name: string;
  value: number;
  fill: string;
}

interface CareerEvent {
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  /* Drop a photo from the event into /public/careers/photos/ and set the path
     here; until then the card shows a placeholder rather than a broken image.
     Note: do not put assets under /public/careers/events/ — that prefix is
     redirected in next.config.js, and redirects are matched before /public. */
  photo?: string;
  photoAlt?: string;
  /* Optional per-photo crop focus, as a CSS object-position. Raise the
     percentage to shift the image up and reveal more of its lower half. */
  photoPosition?: string;
}

const careerEvents: CareerEvent[] = [
  {
    title: 'Consulting Masterclass',
    tagline: 'Six consultants from McKinsey and BCG, one live case competition',
    description:
      'Our flagship consulting event opens with insights and guidance from consultants at McKinsey and BCG, before students tackle a case study of their own in teams, competing against fellow students. We close with a Q&A and the chance to network with the entire panel.',
    highlights: [
      'Panel of six consultants from McKinsey and BCG',
      'Team case study competition',
      'Q&A and open networking with the full panel',
    ],
    photo: '/careers/photos/consulting_masterclass_2526.webp',
    photoAlt: 'Students taking part in the Consulting Masterclass case competition',
    /* portrait shot with a lot of ceiling above the screens, so bias the crop
       well down to keep the panel and the room in frame */
    photoPosition: 'center 85%',
  },
  {
    title: 'Intro to Entrepreneurship',
    tagline: 'Fireside chats with founders who have built at scale',
    description:
      'We bring in founders to talk candidly about building a business from nothing. Most recently that was Hamza Hanif, CEO of Sunna Supplements, an eight figure business with over a quarter of a million customers in the UK and one of the fastest growing companies in Europe. Every session ends with time to meet the founder properly.',
    highlights: [
      'Fireside chat with a founder',
      'The honest version of the growth story',
      'Exclusive networking afterwards',
    ],
    photoAlt: 'Fireside chat with a founder at our entrepreneurship event',
  },
  {
    title: 'Women in Sustainability',
    tagline: 'An exclusive sisters panel on careers across the sustainability space',
    description:
      'Not sure what career paths exist in sustainability? Our sisters panel brings together speakers from across the field, from consulting to academia, to dig into the realities of the work rather than the job titles. Questions are crowdsourced from the sisters community beforehand and put to the panel on the night.',
    highlights: [
      'Speakers spanning consulting and academia',
      'An honest look at day to day work in the field',
      'Audience questions gathered in advance',
    ],
    photo: '/careers/photos/women_in_sustainability_2526.webp',
    photoAlt: 'Speakers at the Women in Sustainability panel',
  },
  {
    title: 'CV Masterclass',
    tagline: 'What recruiters actually look for, from someone who has screened for them',
    description:
      'An evening of practical insight on making a CV stand out through application season. The session is led by a founder whose experience comes from working with organisations including the UN, McKinsey and Deloitte, and walks through what recruiters genuinely look for rather than the usual advice.',
    highlights: [
      'Practical, line by line guidance on your CV',
      'What recruiters at top organisations screen for',
      'Advice grounded in real hiring experience',
    ],
    photo: '/careers/photos/cv_masterclass_2526.webp',
    photoAlt: 'Students at the CV Masterclass',
  },
];

/* Posters from the 2025/26 events, duplicated in the markup so the marquee
   can loop seamlessly. */
const eventPosters = [
  { src: '/careers/posters/cv-masterclass-poster.webp', alt: 'CV Masterclass poster' },
  { src: '/careers/posters/consulting-masterclass-poster.webp', alt: 'Consulting Masterclass poster' },
  { src: '/careers/posters/sustainability-panel-poster.webp', alt: 'Women in Sustainability panel poster' },
  { src: '/careers/posters/entrepreneurship-poster.webp', alt: 'Intro to Entrepreneurship poster' },
  { src: '/careers/posters/careers-fair-poster.webp', alt: 'Careers Fair poster' },
];

const povertyData: ChartDataPoint[] = [
  { name: 'Muslim', value: 50, fill: '#048560' },
  { name: 'Sikh', value: 27, fill: '#b8c7c1' },
  { name: 'Hindu', value: 22, fill: '#b8c7c1' },
  { name: 'Other', value: 20, fill: '#b8c7c1' },
  { name: 'Catholic', value: 19, fill: '#b8c7c1' },
  { name: 'No religion', value: 18, fill: '#b8c7c1' },
  { name: 'Buddhist', value: 17, fill: '#b8c7c1' },
  { name: 'Christian', value: 16, fill: '#b8c7c1' },
  { name: 'Anglican', value: 14, fill: '#b8c7c1' },
].sort((a, b) => b.value - a.value); // Sort by value descending

const wealthData: ChartDataPoint[] = [
  { name: 'Jewish', value: 312500, fill: '#b8c7c1' },
  { name: 'Hindu', value: 277400, fill: '#b8c7c1' },
  { name: 'Christian', value: 164000, fill: '#b8c7c1' },
  { name: 'No religion', value: 160300, fill: '#b8c7c1' },
  { name: 'Any other', value: 67200, fill: '#b8c7c1' },
  { name: 'Muslim', value: 20500, fill: '#048560' },
].sort((a, b) => b.value - a.value); // Sort by value descending

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>
          {payload[0].payload.value.toLocaleString('en-GB', {
            style: payload[0].payload.value > 1000 ? 'currency' : 'percent',
            currency: 'GBP',
            minimumFractionDigits: payload[0].payload.value > 1000 ? 0 : 1,
            maximumFractionDigits: payload[0].payload.value > 1000 ? 0 : 1,
          })}
        </p>
      </div>
    );
  }
  return null;
};

export default function CareersPage() {
  return (
    <div className={styles.careersContainer}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>STEM Muslims Careers</h1>
          <p>Aiming for Ihsaan. Empowering Muslim talent. </p>
        </div>
      </section>

      <section className={styles.overview}>
        <div className={styles.container}>
          <h2>What We Do</h2>
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <h3>Career Development</h3>
              <p>Workshops, mentoring, and resources to help Muslims excel in STEM careers</p>
            </div>
            <div className={styles.missionCard}>
              <h3>Networking</h3>
              <p>Connecting Muslim STEM professionals with industry leaders and opportunities</p>
            </div>
            <div className={styles.missionCard}>
              <h3>Events</h3>
              <p>Hosting career fairs, hackathons, and professional development sessions</p>
            </div>
            <div className={styles.missionCard}>
              <h3>Advocacy</h3>
              <p>Working to address barriers and create inclusive environments for Muslims in STEM</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statistics}>
        <div className={styles.container}>
          <h2>Muslims in the UK Workforce: The Statistics</h2>
          <div className={styles.statsLayout}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>50%</h3>
                <p>Muslim households living in poverty - nearly three times the national average of 18%</p>
              </div>
              <div className={styles.statCard}>
                <h3>19.8%</h3>
                <p>Muslim unemployment rate, compared to 5.4% for the general population</p>
              </div>
              <div className={styles.statCard}>
                <h3>41%</h3>
                <p>of Muslims report experiencing discrimination in job applications</p>
              </div>
              <div className={styles.statCard}>
                <h3>73%</h3>
                <p>of Muslim women report experiencing discrimination in the workplace</p>
              </div>
            </div>

            <div className={styles.chartsColumn}>
            <div className={styles.chartContainer}>
              <h3>Poverty Rates by Religious Affiliation</h3>
              <div className={styles.chartBody}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={povertyData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={62}
                      interval={0}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis 
                      domain={[0, 60]} 
                      tickFormatter={(value) => `${value}%`}
                      width={42}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value"
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                      background={{ fill: '#f5f5f5' }}
                    >
                      {povertyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className={styles.chartSource}>Source: Social Mobility Commission</p>
            </div>
            
            <div className={styles.chartContainer}>
              <h3>Household Wealth by Religious Affiliation</h3>
              <div className={styles.chartBody}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={wealthData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={62}
                      interval={0}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `£${(value/1000).toFixed(0)}k`}
                      width={42}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value"
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                      background={{ fill: '#f5f5f5' }}
                    >
                      {wealthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className={styles.chartSource}>Source: Runnymede Trust</p>
            </div>
            </div>
          </div>
          
          <div className={styles.callToAction}>
            <h3>Our Mission</h3>
            <p>At STEM Muslims, we're committed to addressing these disparities by creating pathways to successful careers, providing mentorship, and building a supportive community for Muslims in STEM fields.</p>
          </div>
        </div>
      </section>

      <section className={styles.events} id="events">
        <div className={styles.container}>
          <h2>Our Career Events</h2>
          <p className={styles.sectionIntro}>
            Across the year we run events that take students from wondering what a career
            in a field actually looks like, to having spoken to the people doing it.
          </p>
          <div className={styles.eventGrid}>
            {careerEvents.map((event) => (
              <article key={event.title} className={styles.eventCard}>
                <div className={styles.eventPhoto}>
                  {event.photo ? (
                    <Image
                      src={event.photo}
                      alt={event.photoAlt ?? event.title}
                      width={600}
                      height={600}
                      className={styles.eventPhotoImg}
                      style={
                        event.photoPosition
                          ? { objectPosition: event.photoPosition }
                          : undefined
                      }
                    />
                  ) : (
                    <div className={styles.photoPlaceholder} aria-hidden="true">
                      <span>Photos to follow</span>
                    </div>
                  )}
                </div>
                <div className={styles.eventBody}>
                  <h3>{event.title}</h3>
                  <p className={styles.eventTagline}>{event.tagline}</p>
                  <p>{event.description}</p>
                  <ul className={styles.eventHighlights}>
                    {event.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.posters}>
        <div className={styles.container}>
          <h2>Posters From Our 2025/26 Events</h2>
          <div className={styles.posterMarqueeContainer}>
            <div className={styles.posterMarquee}>
              {[...eventPosters, ...eventPosters].map((poster, index) => (
                <Image
                  key={`poster-${index}`}
                  src={poster.src}
                  alt={index < eventPosters.length ? poster.alt : ''}
                  aria-hidden={index >= eventPosters.length}
                  width={400}
                  height={500}
                  className={styles.poster}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.fairBanner}>
        <div className={styles.container}>
          <h2>The Careers Fair</h2>
          <p>
            Our biggest careers event of the year: a fireside chat with industry
            professionals, exhibition stalls from companies across STEM, and an evening
            of networking with a community built around professional growth.
          </p>
          <Link href="/careers/careers-fair" className={styles.fairButton}>
            Explore the Careers Fair
          </Link>
        </div>
      </section>
    </div>
  );
}
