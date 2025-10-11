'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './beyond-borders.module.scss';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function EducationBeyondBordersPage() {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    mission: null,
    impact: null,
    programs: null,
    volunteer: null,
    donate: null,
    video: null,
    kuramaa: null
  });

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);


  const playVideo = (id: number) => {
    setIsVideoPlaying(true);
  };

  const closeVideo = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className={styles.beyondBordersPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
            <h1 className={styles.h1}>Education Beyond Borders</h1>
            <p className={styles.tagline}>Empowering Syrian orphans through knowledge and education</p>

          <div className={styles.heroButtons}>
            <button className={styles.primaryButton}>Volunteer</button>
            <button className={styles.secondaryButton}>Donate</button>
            </div>
        </div>
      </section>

      {/* Official Poster Section */}
      <section className={styles.posterSection}>
        <div className={styles.posterContainer}>
          <div className={styles.posterWrapper}>
            <Image 
              src="/education/beyond-borders/poster.png" 
              alt="Education Beyond Borders Official Poster" 
              width={800} 
              height={800}
              className={styles.posterImage}
              priority
              loading="eager"
            />
          </div>
          <div className={styles.posterContent}>
            <h2>Join Our Initiative</h2>
            <p>
              Make a lasting impact by teaching underprivileged students affected by the Syrian conflict.
              Share your STEM knowledge and skills with eager learners over Zoom, and earn Sadaqah Jariyah.
            </p>
            <div className={styles.partnershipHighlight}>
              <div className={styles.partnerLogo}>
                <Image 
                  src="/favicon.ico" 
                  alt="STEM Muslims Logo" 
                  width={120} 
                  height={120}
                />
                <span>STEM Muslims</span>
              </div>
              <div className={styles.partnershipX}>X</div>
              <div className={styles.partnerLogo}>
                <Image 
                  src="/education/beyond-borders/kuramaa-logo.png" 
                  alt="Kuramaa Logo" 
                  width={120} 
                  height={120}
                />
                <span>Kuramaa</span>
              </div>
            </div>
            <button className={styles.signupButton}>SIGN UP NOW!</button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.mission = el
        }}
        className={`${styles.section} ${styles.missionSection}`}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Our Mission</h2>
            <p>
              Education Beyond Borders is a STEM Muslims initiative that extends our educational mission 
              globally, focusing on providing quality education to Syrian orphans affected by conflict.
            </p>
            <p>
              We believe that education is a powerful tool for change and that every child deserves 
              access to learning opportunities regardless of their circumstances. Through virtual 
              classrooms and dedicated volunteers, we're bridging educational gaps and creating 
              pathways to a brighter future.
            </p>
            <div className={styles.missionStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Children Reached</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>20+</span>
                <span className={styles.statLabel}>Volunteer Teachers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3</span>
                <span className={styles.statLabel}>Months Running</span>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image 
              src="/education/beyond-borders/image4.jpeg" 
              alt="Syrian children learning" 
              width={500} 
              height={350}
              className={styles.image}
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Kuramaa Charity Section */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.kuramaa = el
        }}
        className={`${styles.section} ${styles.kuramaaSection}`}
      >
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
              src="/education/beyond-borders/image5.jpeg" 
              alt="Kuramaa charity work" 
              width={500} 
              height={350}
              className={styles.image}
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.content}>
            <h2>About Kuramaa</h2>
            <div className={styles.kuramaaTagline}>Care & Rehabilitation for Widows & Orphans</div>
            <p>
              Kuramaa is a dedicated charity organization focused on providing care and rehabilitation 
              services for widows and orphans affected by the Syrian conflict. Their comprehensive 
              approach addresses not only immediate needs but also long-term development.
            </p>
            <p>
              Founded in 2015, Kuramaa has established multiple centers across Syria, Turkey, Lebanon, 
              Jordan, and Palestine, offering:
            </p>
            <ul className={styles.kuramaaServices}>
              <li>Educational support and schooling for orphans</li>
              <li>Vocational training for widows to achieve financial independence</li>
              <li>Psychological support and trauma counseling</li>
              <li>Healthcare services and medical assistance</li>
              <li>Safe housing and community development</li>
            </ul>
            <p>
              Our partnership with Kuramaa allows us to directly connect with children who need 
              educational support the most, ensuring our efforts make a meaningful difference.
            </p>
            <Link href="https://kuramaa.org" target="_blank" className={styles.kuramaaButton}>
              Visit Kuramaa's Website
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.video = el
        }}
        className={`${styles.section} ${styles.videoSection}`}
      >
        <div className={styles.videoContainer}>
          <h2>See Our Impact</h2>
          <p className={styles.videoIntro}>
            Watch how Education Beyond Borders is making a difference in the lives of Syrian orphans.
          </p>
          
          <div className={styles.videoWrapper}>
            {!hasInteracted && (
              <div 
                className={styles.videoOverlay} 
                onClick={() => {
                  setHasInteracted(true);
                  setIsVideoPlaying(true);
                }}
              >
                <div className={styles.playButton}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                </div>
                <p>Click to play video</p>
              </div>
            )}
            
            <div className={styles.reactPlayerContainer}>
              <ReactPlayer
                url="/education/beyond-borders/video.mp4"
                width="100%"
                height="100%"
                playing={isVideoPlaying}
                controls={hasInteracted}
                light={true}
                playIcon={<></>}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onEnded={() => setIsVideoPlaying(false)}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                      disablePictureInPicture: true,
                    }
                  }
                }}
                style={{ borderRadius: '12px', overflow: 'hidden' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.programs = el
        }}
        className={`${styles.section} ${styles.programsSection}`}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Our Programs</h2>
            <p>
              We offer a diverse range of educational programs tailored to different age groups 
              and learning needs. All our programs are delivered online by dedicated volunteers.
            </p>
            
            <div className={styles.programsGrid}>
              <div className={styles.program}>
                <div className={styles.programIcon}>📝</div>
                <h3>Core Academics</h3>
                <p>Mathematics, science, language arts, and social studies for all grade levels</p>
              </div>
              
              <div className={styles.program}>
                <div className={styles.programIcon}>💻</div>
                <h3>Digital Literacy</h3>
                <p>Computer skills, basic programming, and internet safety for older children</p>
              </div>
              
              <div className={styles.program}>
                <div className={styles.programIcon}>🎨</div>
                <h3>Creative Expression</h3>
                <p>Art, storytelling, and creative writing to process experiences and build confidence</p>
              </div>
              
              <div className={styles.program}>
                <div className={styles.programIcon}>🧠</div>
                <h3>Life Skills</h3>
                <p>Problem-solving, critical thinking, and emotional resilience workshops</p>
              </div>
              
              <div className={styles.program}>
                <div className={styles.programIcon}>🌱</div>
                <h3>Mentorship</h3>
                <p>One-on-one guidance from university students and professionals</p>
              </div>
              
              <div className={styles.program}>
                <div className={styles.programIcon}>🔬</div>
                <h3>STEM Projects</h3>
                <p>Hands-on science and engineering projects with available materials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.volunteer = el
        }}
        className={`${styles.section} ${styles.volunteerSection}`}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Become a Volunteer</h2>
            <p>
              Our volunteers are the heart of Education Beyond Borders. Whether you're a student, 
              professional, or retiree, your knowledge and time can make a lasting difference in 
              a child's life.
            </p>
            <p>
              We welcome volunteers with various skills and backgrounds:
            </p>
            <ul className={styles.volunteerList}>
              <li>Teachers for core subjects (Math, Science, Languages)</li>
              <li>Technology and computer skills instructors</li>
              <li>Translators (Arabic-English)</li>
              <li>Program coordinators and administrators</li>
              <li>Mentors for one-on-one guidance</li>
            </ul>
            <p>
              Volunteers typically commit to 1-2 hours per week for at least one term (3 months).
              All sessions are conducted online via Zoom, making it accessible no matter where you're located.
            </p>
            <div className={styles.volunteerBenefits}>
              <h3>Benefits of Volunteering</h3>
              <p>
                Beyond the immense reward of making a difference in children's lives, volunteering with 
                Education Beyond Borders offers:
              </p>
              <ul>
                <li>Sadaqah Jariyah (ongoing charity) through sharing knowledge</li>
                <li>Teaching experience for your CV/resume</li>
                <li>Cross-cultural communication skills</li>
                <li>Training and support from experienced educators</li>
                <li>Being part of a global community of dedicated volunteers</li>
              </ul>
            </div>
            <button className={styles.volunteerButton}>Apply to Volunteer</button>
          </div>
          <div className={styles.imageContainer}>
            <Image 
              src="/education/beyond-borders/image1.jpeg" 
              alt="Volunteer teaching online" 
              width={500} 
              height={350}
              className={styles.image}
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section 
        ref={(el) => {
          if (el) sectionRefs.current.donate = el
        }}
        className={`${styles.section} ${styles.donateSection}`}
      >
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
              src="/education/beyond-borders/image2.jpeg" 
              alt="Educational supplies for children" 
              width={500} 
              height={350}
              className={styles.image}
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.content}>
            <h2>Support Our Mission</h2>
            <p>
              Your donations help us provide essential educational resources to Syrian orphans, 
              including:
            </p>
            <ul className={styles.donateList}>
              <li>Learning materials and textbooks</li>
              <li>Internet access for online classes</li>
              <li>Basic tablets or computers for digital learning</li>
              <li>Training for volunteer teachers</li>
              <li>Program coordination and administration</li>
            </ul>
            <p>
              Every contribution, no matter the size, helps us expand our reach and impact.
              All donations are processed securely through Kuramaa's established channels,
              ensuring your support directly benefits the children in need.
            </p>
            <div className={styles.donateOptions}>
              <button className={styles.donateButton}>Make a One-Time Donation</button>
              <button className={styles.donateMonthlyButton}>Become a Monthly Supporter</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <h2>Get in Touch</h2>
          <p>
            Have questions about Education Beyond Borders? Want to learn more about how you can help?
            We'd love to hear from you.
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.contactMethod}>
              <div className={styles.contactIcon}>✉️</div>
              <p>stemmuslims@imperial.ac.uk</p>
            </div>
            <div className={styles.contactMethod}>
              <div className={styles.contactIcon}>📱</div>
              <p>Follow us on social media @stem.muslims</p>
            </div>
          </div>
          <Link href="/education" className={styles.backLink}>
            ← Return to Education Page
          </Link>
        </div>
      </section>
    </div>
  );
} 