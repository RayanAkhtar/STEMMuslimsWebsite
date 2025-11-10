'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './education.module.scss';

export default function EducationPage() {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    intro: null,
    tutorials: null,
    representatives: null,
    events: null,
    resources: null,
    beyond: null
  });

  // Animation on scroll
  useEffect(() => {
    // Use slightly more forgiving options and a fallback for environments
    // where IntersectionObserver may not reliably trigger (some mobile browsers).
    if (typeof window !== 'undefined' && !(window as any).IntersectionObserver) {
      // If IntersectionObserver isn't supported, reveal everything.
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) ref.classList.add(styles.visible);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // As a safety net: if the observer hasn't revealed sections after 600ms,
    // reveal them to avoid leaving users staring at blank areas.
    const safety = setTimeout(() => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref && !ref.classList.contains(styles.visible)) {
          ref.classList.add(styles.visible);
        }
      });
    }, 600);

    return () => {
      clearTimeout(safety);
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className={styles.educationPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Education</h1>
          <p className={styles.quote}>
            "Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise"
          </p>
          <p className={styles.citation}>(Ṣaḥīḥ Muslim 2699)</p>
        </div>
      </section>

      {/* Introduction */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.intro = el;
        }}
        className={`${styles.section} ${styles.introSection}`}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Our Mission</h2>
            <p>
              Education is a core part of STEM Muslims, rooted in the belief that seeking knowledge 
              is a sacred duty in Islam. Our mission is to support our fellow Muslims in their studies, 
              helping us grow both academically and spiritually as we strive to elevate ourselves and 
              contribute to the strengthening of the Ummah through knowledge Insha'Allah.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image 
              src="/Outreach/stemDay.jpg" 
              alt="Lecturer teaching students" 
              width={500} 
              height={350}
              className={styles.image}
              onError={() => { /* ignore image load errors to avoid breaking render */ }}
            />
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.tutorials = el;
        }}
        className={`${styles.section} ${styles.tutorialsSection}`}
      >
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
              src="/education/tutorial.jpeg" 
              alt="Tutorial session" 
              width={500} 
              height={350}
              className={styles.image}
              onError={() => {}}
            />
          </div>
          <div className={styles.content}>
            <h2>Tutorials</h2>
            <p>
              We run tutorials on a wide range of topics, from practical tech skills like Python, Git, 
              and Linux to academic tools like LaTeX. These are all designed to equip students with 
              real-world capabilities and improve the work in their own degrees.
            </p>
            <div className={styles.skillsContainer}>
              <div className={styles.skill}>Python</div>
              <div className={styles.skill}>Git</div>
              <div className={styles.skill}>Linux</div>
              <div className={styles.skill}>LaTeX</div>
              <div className={styles.skill}>MATLAB</div>
              <div className={styles.skill}>R</div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Representatives */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.representatives = el;
        }}
        className={`${styles.section} ${styles.representativesSection}`}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Academic Representatives</h2>
            <p>
              We have Academic Representatives for each subject that setup subject specific tutorials 
              as well as give academic and exam advice for anyone who asks them on their course.
            </p>
            <div className={styles.subjectsGrid}>
              <div className={styles.subject}>
                <div className={styles.subjectIcon}>🧪</div>
                <div className={styles.subjectName}>Chemistry</div>
              </div>
              <div className={styles.subject}>
                <div className={styles.subjectIcon}>💻</div>
                <div className={styles.subjectName}>Computing</div>
              </div>
              <div className={styles.subject}>
                <div className={styles.subjectIcon}>🧬</div>
                <div className={styles.subjectName}>Biology</div>
              </div>
              <div className={styles.subject}>
                <div className={styles.subjectIcon}>⚙️</div>
                <div className={styles.subjectName}>Engineering</div>
              </div>
              <div className={styles.subject}>
                <div className={styles.subjectIcon}>🔢</div>
                <div className={styles.subjectName}>Mathematics</div>
              </div>
              <div className={styles.subject}>
                <div className={styles.subjectIcon}>🔭</div>
                <div className={styles.subjectName}>Physics</div>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image 
              src="/education/tutorial2.jpeg" 
              alt="Academic representative helping students" 
              width={500} 
              height={350}
              className={styles.image}
              onError={() => {}}
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.events = el;
        }}
        className={`${styles.section} ${styles.eventsSection}`}
      >
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
              src="/education/education-hero.jpeg" 
              alt="STEM Muslims event" 
              width={500} 
              height={350}
              className={styles.image}
              onError={() => {}}
            />
          </div>
          <div className={styles.content}>
            <h2>Events & Opportunities</h2>
            <p>
              We host events like Muslims in AI and the STEM M Spotlight, which focus on research 
              and internships to help students improve their chances of securing valuable 
              opportunities in both areas.
            </p>
            <div className={styles.eventsList}>
              <div className={styles.event}>
                <h3>Muslims in AI</h3>
                <p>Exploring the intersection of Islamic ethics and artificial intelligence</p>
              </div>
              <div className={styles.event}>
                <h3>STEM M Spotlight</h3>
                <p>Highlighting research and internship opportunities for Muslim students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.resources = el;
        }}
        className={`${styles.section} ${styles.resourcesSection}`}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Resources & Community</h2>
            <p>
              We provide connections in the form of group chats to help you connect with other people 
              on your course so you always have someone to ask for help.
            </p>
            <p>
              We have a large bank of resources with notes, past papers and course tips in our 
              House of Wisdom Teams Channel as well as the Ihsaan by Fosis Careers Resource Guide
            </p>
            <div className={styles.resourcesBox}>
              <h3>House of Wisdom Resources</h3>
              <ul>
                <li>Course Notes</li>
                <li>Past Papers</li>
                <li>Study Guides</li>
                <li>Tutorial Recordings</li>
                <li>Subject Group Chats</li>
              </ul>

              <div className={styles.ihsaanBox}>
                <h3>The Ihsaan Careers Guide</h3>
                <p>Your essential handbook for career success as a Muslim student. In an increasingly competitive graduate market, we provide:</p>
                <ul>
                  <li>Practical guidance to stand out from 300,000+ annual graduates</li>
                  <li>Strategies to overcome unique challenges Muslim graduates face</li>
                  <li>Resources to embody excellence (Ihsaan) in your professional journey</li>
                </ul>
                <div className={styles.ihsaanActions}>
                  <Link href="https://ihsaanbyfosis.notion.site/careers-essentials?v=1c37c26bd27f80d18a4d000c5ae1053b" className={styles.resourcesButton}>Check out the lGuide</Link>

                </div>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image 
              src="/education/resources.png" 
              alt="Educational resources" 
              width={500} 
              height={350}
              className={styles.image}
              onError={() => {}}
            />
          </div>
        </div>
      </section>

        
      {/* Education Beyond Borders Section */}
      <section className={`${styles.section} ${styles.beyondBordersSection}`}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Education Beyond Borders</h2>
            <p>
              How can you use your skills to help educate childrne in need? Look out at our Education Beyond Borders page to find out more about
              the work we do in Syria, Lebanon, Jordan, Palestine and Turkey.
            </p>
            <Link href="/education/beyond-borders" className={styles.beyondBordersButton}>
                Education Beyond Borders
            </Link>
          </div>
          <div className={styles.imageContainer}>
            <Image 
              src="/education/beyond-borders.png"
              alt="Education Beyond Borders"
              width={500}
              height={350}
              className={styles.image}
              onError={() => {}}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

