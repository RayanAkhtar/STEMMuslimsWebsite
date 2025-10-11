'use client';

import React, { useState, useEffect } from 'react';
import styles from './careers-fair.module.scss';
import Image from 'next/image';

const topRowLogos = [
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  // Duplicate for infinite scroll
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg'
];

const bottomRowLogos = [
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  // Duplicate for infinite scroll
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg',
  '/careers/logos/anterior.svg'
];

export default function CareersFairPage() {
    const [timeLeft, setTimeLeft] = useState<{
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    const [isLoading, setIsLoading] = useState(true);
  
    // Set the event date (June 17, 2025 at 6:00 PM)
    const eventDate = new Date('2025-06-17T18:00:00');
  
    // Update countdown timer
    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();
        
        if (difference <= 0) {
          clearInterval(timer);
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          });
          return;
        }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
      setIsLoading(false);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.careersFairContainer}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>STEM Muslims Annual Careers Fair</h1>
          <p>June 17, 2025 • 6:00 PM</p>
          <p>Connect with top employers and launch your STEM career</p>
        </div>
        {/* <div className={styles.scrollIndicator}>
          <div className={styles.mouse}>
            <div className={styles.wheel} />
          </div>
          <div className={styles.arrows}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div> */}
      </section>

      <section className={styles.countdown}>
        <div className={styles.container}>
          <h2>Event Countdown</h2>
          <div className={styles.countdownTimer}>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>
                {isLoading ? <span className={styles.loading}>...</span> : timeLeft.days}
              </div>
              <div className={styles.countdownLabel}>Days</div>
            </div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>
                {isLoading ? <span className={styles.loading}>...</span> : timeLeft.hours}
              </div>
              <div className={styles.countdownLabel}>Hours</div>
            </div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>
                {isLoading ? <span className={styles.loading}>...</span> : timeLeft.minutes}
              </div>
              <div className={styles.countdownLabel}>Minutes</div>
            </div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>
                {isLoading ? <span className={styles.loading}>...</span> : timeLeft.seconds}
              </div>
              <div className={styles.countdownLabel}>Seconds</div>
            </div>
          </div>
          <div className={styles.registerButton}>
            <a href="#register">Register Now</a>
          </div>
        </div>
      </section>

      <section className={styles.eventDetails}>
        <div className={styles.container}>
          <h2>About the Event</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailsContent}>
              <p>The STEM Muslims Annual Careers Fair is our flagship event connecting Muslim students and professionals with leading employers in Science, Technology, Engineering, and Mathematics fields.</p>
              <p>This year's event will feature:</p>
              <ul>
                <li>Networking opportunities with 30+ employers</li>
                <li>On-the-spot interviews</li>
                <li>Resume review sessions</li>
                <li>Industry panels and talks</li>
                <li>Career advice from successful Muslim professionals</li>
              </ul>
              <p>Whether you're a student looking for your first role, a recent graduate seeking opportunities, or an experienced professional exploring new paths, our careers fair has something for you.</p>
            </div>
            <div className={styles.detailsImage}>
              <Image 
                src="/careers/careers-fair-details.jpg" 
                alt="People networking at a careers fair" 
                width={500} 
                height={350}
                className={styles.detailsImg}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partners}>
        <div className={styles.container}>
          <h2>Participating Companies</h2>
          <div className={styles.logoMarqueeContainer}>
            <div className={`${styles.logoMarquee} ${styles.reverse}`}>
              {[...topRowLogos, ...topRowLogos].map((logo, index) => (
                <Image
                  key={`top-${index}`}
                  src={logo}
                  alt="Partner company"
                  width={120}
                  height={40}
                  className={styles.logo}
                  style={{ opacity: 1 }}
                />
              ))}
            </div>
            <div className={styles.logoMarquee}>
              {[...bottomRowLogos, ...bottomRowLogos].map((logo, index) => (
                <Image
                  key={`bottom-${index}`}
                  src={logo}
                  alt="Partner company"
                  width={120}
                  height={40}
                  className={styles.logo}
                  style={{ opacity: 0.9 }}
                />
              ))}
            </div>
            <div className={`${styles.logoMarquee} ${styles.reverse}`}>
              {[...topRowLogos, ...topRowLogos].map((logo, index) => (
                <Image
                  key={`third-${index}`}
                  src={logo}
                  alt="Partner company"
                  width={120}
                  height={40}
                  className={styles.logo}
                  style={{ opacity: 0.6 }}
                />
              ))}
            </div>
            <div className={styles.logoMarquee}>
              {[...bottomRowLogos, ...bottomRowLogos].map((logo, index) => (
                <Image
                  key={`fourth-${index}`}
                  src={logo}
                  alt="Partner company"
                  width={120}
                  height={40}
                  className={styles.logo}
                  style={{ opacity: 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.register} id="register">
        <div className={styles.container}>
          <h2>Register for the Event</h2>
          <p>Secure your place at the STEM Muslims Annual Careers Fair:</p>
          <form className={styles.registerForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="status">Current Status</label>
              <select id="status" name="status" required>
                <option value="">Select an option</option>
                <option value="student">Student</option>
                <option value="graduate">Recent Graduate</option>
                <option value="professional">Professional</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="interests">Areas of Interest</label>
              <input type="text" id="interests" name="interests" placeholder="e.g., Software Engineering, Biotech" />
            </div>
            <button type="submit" className={styles.submitButton}>Register Now</button>
          </form>
        </div>
      </section>
    </div>
  );
} 