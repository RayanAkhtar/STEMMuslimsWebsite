import React from 'react';
import styles from './careers-fair.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface Company {
  name: string;
  /* Sector is left undefined where we aren't certain of it, rather than
     guessing; the card then just shows the name. */
  sector?: string;
  /* Drop a logo into /public/careers/company-logos/ and set the path here. */
  logo?: string;
}

/* Organisations that exhibited at the 2025/26 fair. Deliberately mixed rather
   than ranked, so no ordering is implied; the order is fixed here rather than
   randomised at render so it stays stable between builds. */
const companies: Company[] = [
  { name: 'Deloitte', sector: 'Professional services' },
  { name: 'Kestrl', sector: 'Islamic fintech' },
  { name: 'Microsoft', sector: 'Technology' },
  { name: 'MIPP', sector: 'Public policy network' },
  { name: 'Bank of England', sector: 'Central banking' },
  { name: 'Stantec', sector: 'Engineering and design' },
  { name: 'Uncooked', sector: 'Hiring technology' },
  { name: 'IBM', sector: 'Technology' },
  { name: 'NESO', sector: 'Energy' },
  { name: 'PwC', sector: 'Professional services' },
  { name: 'AME', sector: 'Engineering network' },
  { name: 'Amazon', sector: 'Technology and e-commerce' },
  { name: 'CIL Strategy Consultants', sector: 'Strategy consulting' },
  { name: 'Jaguar', sector: 'Automotive' },
  { name: 'RFF' },
  { name: 'BCG', sector: 'Management consulting' },
  { name: 'Dojo', sector: 'Payments and fintech' },
  { name: 'Maa' },
  { name: 'Capgemini', sector: 'Technology consulting' },
  { name: 'UK Civil Service', sector: 'Government' },
  { name: 'PE Ltd', sector: 'Energy software' },
  { name: 'Expedia Group', sector: 'Travel technology' },
  { name: 'SIFR Group' },
  { name: 'Mace', sector: 'Construction and consultancy' },
];

/* Dealt into two strips that scroll in opposite directions. Alternating keeps
   the better known names spread across both rows. */
const companyRows: Company[][] = [
  companies.filter((_, index) => index % 2 === 0),
  companies.filter((_, index) => index % 2 === 1),
];

export default function CareersFairPage() {
  return (
    <div className={styles.careersFairContainer}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>STEM Muslims Careers Fair</h1>
          <p>Our biggest careers event, held every year at Imperial College London</p>
          <p>Connect with employers across STEM and hear the journeys behind the job titles</p>
        </div>
      </section>

      <section className={styles.eventDetails}>
        <div className={styles.container}>
          <h2>About the Event</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailsContent}>
              <p>The STEM Muslims Careers Fair is our flagship event, connecting Muslim students and professionals with employers across Science, Technology, Engineering and Mathematics. It runs once a year; the summer 2026 edition was held at the Sir Alexander Fleming Building, Imperial College London.</p>
              <p>You have seen the job titles and the LinkedIn profiles, but rarely the journey behind them. The fair is a chance to hear it straight from the people who have lived it. Each year it features:</p>
              <ul>
                <li>A fireside chat with industry professionals</li>
                <li>Exhibition stalls from companies and individuals across STEM fields</li>
                <li>Networking with a community built around professional growth</li>
                <li>Light refreshments across the evening</li>
              </ul>
              <p>Whether you are a student figuring out your next step, a recent graduate seeking opportunities, or a professional looking to give back, there is a spot for you.</p>
            </div>
            <div className={styles.detailsImage}>
              <Image
                src="/careers/careersfair2.jpg"
                alt="People networking at a careers fair"
                width={500}
                height={350}
                className={styles.detailsImg}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.companies}>
        <div className={styles.container}>
          <h2>Who Exhibited in 2025/26</h2>
          <p className={styles.companiesIntro}>
            The organisations that joined us on the exhibition floor for the 2025/26 fair,
            spanning banking, consulting, technology, engineering, energy and the public
            sector.
          </p>
          <div className={styles.companyMarqueeContainer}>
            {[0, 1].map((row) => (
              <div
                key={row}
                className={`${styles.companyMarquee} ${row === 1 ? styles.reverse : ''}`}
              >
                {/* rendered twice so the strip can loop seamlessly */}
                {[...companyRows[row], ...companyRows[row]].map((company, index) => (
                  <div
                    key={`${row}-${index}-${company.name}`}
                    className={styles.companyCard}
                    aria-hidden={index >= companyRows[row].length}
                  >
                    {company.logo && (
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        width={160}
                        height={60}
                        className={styles.companyLogo}
                      />
                    )}
                    <span className={styles.companyName}>{company.name}</span>
                    {company.sector && (
                      <span className={styles.companySector}>{company.sector}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.takePart}>
        <div className={styles.container}>
          <h2>Taking Part</h2>
          <div className={styles.takePartGrid}>
            <div className={styles.takePartCard}>
              <h3>Students</h3>
              <p>
                Registration opens ahead of each year&apos;s fair. Join our mailing list to
                be told when places go live.
              </p>
              <Link href="/outreach/subscribe" className={styles.takePartButton}>
                Join the mailing list
              </Link>
            </div>
            <div className={styles.takePartCard}>
              <h3>Companies</h3>
              <p>
                Interested in exhibiting, sponsoring, or speaking at a future fair? We would
                be glad to hear from you.
              </p>
              <Link href="/contact" className={styles.takePartButton}>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
