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

const povertyData: ChartDataPoint[] = [
  { name: 'Muslim', value: 50, fill: '#00A896' },
  { name: 'Sikh', value: 27, fill: '#6a928d' },
  { name: 'Hindu', value: 22, fill: '#6a928d' },
  { name: 'Other', value: 20, fill: '#6a928d' },
  { name: 'Catholic', value: 19, fill: '#6a928d' },
  { name: 'No religion', value: 18, fill: '#6a928d' },
  { name: 'Buddhist', value: 17, fill: '#6a928d' },
  { name: 'Christian', value: 16, fill: '#6a928d' },
  { name: 'Anglican', value: 14, fill: '#6a928d' },
].sort((a, b) => b.value - a.value); // Sort by value descending

const wealthData: ChartDataPoint[] = [
  { name: 'Jewish', value: 312500, fill: '#6a928d' },
  { name: 'Hindu', value: 277400, fill: '#6a928d' },
  { name: 'Christian', value: 164000, fill: '#6a928d' },
  { name: 'No religion', value: 160300, fill: '#6a928d' },
  { name: 'Any other', value: 67200, fill: '#6a928d' },
  { name: 'Muslim', value: 20500, fill: '#00A896' },
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
          
          <div className={styles.chartsRow}>
            <div className={styles.chartContainer}>
              <h3>Poverty Rates by Religious Affiliation</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={povertyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis 
                    domain={[0, 60]} 
                    tickFormatter={(value) => `${value}%`}
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
              <p className={styles.chartSource}>Source: Social Mobility Commission</p>
            </div>
            
            <div className={styles.chartContainer}>
              <h3>Household Wealth by Religious Affiliation</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={wealthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis 
                    tickFormatter={(value) => `£${(value/1000).toFixed(0)}k`}
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
              <p className={styles.chartSource}>Source: Runnymede Trust</p>
            </div>
          </div>
          
          <div className={styles.callToAction}>
            <h3>Our Mission</h3>
            <p>At STEM Muslims, we're committed to addressing these disparities by creating pathways to successful careers, providing mentorship, and building a supportive community for Muslims in STEM fields.</p>
            <Link href="/careers/events" className={styles.ctaButton}>
              Explore Our Career Events
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.upcomingEvents}>
        <div className={styles.container}>
          <h2>Featured Events</h2>
          <div className={styles.eventCards}>
            <div className={styles.eventCard}>
              <div className={styles.eventDate}>June 17, 2023</div>
              <h3>Annual Careers Fair</h3>
              <p>Connect with top employers in STEM fields</p>
              <Link href="/careers/events/careers-fair" className={styles.eventLink}>
                Learn More
              </Link>
            </div>
            <div className={styles.eventCard}>
              <div className={styles.eventDate}>Coming Soon</div>
              <h3>STEM Hackathon</h3>
              <p>Showcase your skills and solve real-world problems</p>
              <Link href="/careers/events/hackathon" className={styles.eventLink}>
                Learn More
              </Link>
            </div>
          </div>
          <div className={styles.viewAll}>
            <Link href="/careers/events">
              View All Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
