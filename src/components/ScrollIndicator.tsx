'use client';

import React, { useEffect, useState } from 'react';
import styles from './ScrollIndicator.module.scss';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Hide indicator when user has scrolled past 90% of the page
      setIsVisible(progress < 90);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div className={`${styles.scrollIndicator} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.thermometer}>
        <div className={styles.degrees}>
          <div className={styles.top}>100%</div>
          <div className={styles.middle}>50%</div>
          <div className={styles.bottom}>0%</div>
        </div>
        <div className={styles.tube}>
          <div 
            className={styles.liquid} 
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}