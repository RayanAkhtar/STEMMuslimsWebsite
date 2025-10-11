"use client";

import React, { useState, useEffect } from "react";
import styles from "./home.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type EventItem = {
    id: number;
    title: string;
    date: string;
    description: string;
    poster: string;
};

// is passed the info from json file, handles displaying it + scrolling through
export default function Carousel({ events }: { events: EventItem[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || events.length <= 1) return;
        
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % events.length);
        }, 6000);
        
        return () => clearInterval(interval);
    }, [isAutoPlaying, events.length]);

    // Pause auto-play when user interacts
    const pauseAutoPlay = () => {
        setIsAutoPlaying(false);
        // Resume after 10 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const handleNext = () => {
        pauseAutoPlay();
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % events.length);
    };

    const handlePrevious = () => {
        pauseAutoPlay();
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    };

    // Truncate description if too long
    const truncateDescription = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Format date nicely
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            // Use a more explicit format that will be consistent
            const day = date.getDate();
            const month = date.toLocaleString('en-GB', { month: 'long' });
            const year = date.getFullYear();
            const weekday = date.toLocaleString('en-GB', { weekday: 'long' });
            
            // Format without commas to ensure consistency
            return `${weekday} ${day} ${month} ${year}`;
        } catch (e) {
            return dateString;
        }
    };

    // Variants for animations
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.5,
                ease: "easeIn"
            }
        })
    };

    // Pagination dots
    const renderPaginationDots = () => {
        return (
            <div className={styles.paginationDots}>
                {events.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.paginationDot} ${index === currentIndex ? styles.activeDot : ''}`}
                        onClick={() => {
                            pauseAutoPlay();
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        );
    };

    if (!events || events.length === 0) {
        return <div className={styles.container_highlights}>No events available</div>;
    }

    const currentEvent = events[currentIndex];

    return (
        <div className={styles.container_highlights}>
            <h2 className={styles.title}>
                <span className={styles.titleHighlight}>OUR</span> EVENTS
            </h2>
            
            <div className={styles.carouselContainer}>
                <button 
                    className={`${styles.carouselButton} ${styles.leftButton}`} 
                    onClick={handlePrevious}
                    aria-label="Previous event"
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                <div className={styles.carouselWrapper}>
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className={styles.eventCard}
                        >
                            <div className={styles.posterContainer}>
                                {currentEvent.poster ? (
                                    currentEvent.poster.startsWith('/') ? (
                                        <Image 
                                            src={currentEvent.poster} 
                                            alt={currentEvent.title} 
                                            className={styles.poster}
                                            width={500}
                                            height={500}
                                            priority
                                        />
                                    ) : (
                                        <img 
                                            src={currentEvent.poster} 
                                            alt={currentEvent.title} 
                                            className={styles.poster}
                                            style={{ aspectRatio: '1/1' }}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/placeholder-event.jpg';
                                            }}
                                        />
                                    )
                                ) : (
                                    <div className={styles.fallbackPoster}>
                                        <span>STEM Muslims</span>
                                    </div>
                                )}
                                <div className={styles.posterOverlay} />
                            </div>
                            
                            <motion.div 
                                className={styles.details}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                <h3 className={styles.eventName}>{currentEvent.title}</h3>
                                <p className={styles.eventDate}>{formatDate(currentEvent.date)}</p>
                                <div className={styles.descriptionContainer}>
                                    <p className={styles.eventDescription}>
                                        {truncateDescription(currentEvent.description)}
                                    </p>
                                </div>
                                <motion.button 
                                    className={styles.readMoreButton}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Learn More
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                <button 
                    className={`${styles.carouselButton} ${styles.rightButton}`} 
                    onClick={handleNext}
                    aria-label="Next event"
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            
            {renderPaginationDots()}

            <div className={styles.newsletterContainer}>
                <p className={styles.newsletter}>
                    <a 
                        href="https://forms.office.com/pages/responsepage.aspx?id=B3WJK4zudUWDC0-CZ8PTB_FPR1TjLttGvCjlVkZ9yz9UMTQzTlFGUUpMQkhIQUZaRFFaRVlBWEdPVC4u"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.newsletterLink}
                    >
                        SIGN UP TO OUR NEWSLETTER TO STAY UPDATED!
                    </a>
                </p>
            </div>
        </div>
    );
}
