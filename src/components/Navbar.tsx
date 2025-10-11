"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

const links = [
    ["Home", "/home"],
    ["About", "/about"],
    ["Our Committee", "/committee"],
    ["Careers", "/careers", [
        ["Current Events", "/careers/events"],
        ["Careers Fair", "/careers/events/careers-fair"],
    ]],
    ["Education", "/education", [
        ["Beyond Borders", "/education/beyond-borders"],
        
    ]],
    ["Outreach", "/outreach", [
        ["STEM Day", "/outreach/stem-day"],
        ["Competitions", "/outreach/competitions"],
        ["Subscribe", "/outreach/subscribe"],
    ]],
    ["Contact", "/contact"],
];

export default function Navbar() {
    const [menuActive, setMenuActive] = useState(false);
    const [expandedSubmenu, setExpandedSubmenu] = useState<number | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    // Track scrolling to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setMenuActive(false);
            }
        };

        // Handle scroll lock when menu is open
        const body = document.body;
        if (menuActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            body.style.overflow = 'auto';
        };
    }, [menuActive]);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuActive(false);
    }, [pathname]);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
        setExpandedSubmenu(null);
    };

    const toggleSubmenu = (index: number, event?: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        setExpandedSubmenu(expandedSubmenu === index ? null : index);
    };

    // Check if a link is active
    const isActive = (route: string) => {
        if (route === '/home' && pathname === '/') return true;
        return pathname === route || pathname.startsWith(`${route}/`);
    };

    // Check if a dropdown item is active
    const isDropdownActive = (items: string[][]) => {
        return items.some(([_, route]) => isActive(route));
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} ref={navRef}>
            <div className={styles.navbarBody}>
                <Link href="/home" className={styles.logoContainer}>
                    <div className={styles.logoWrapper}>
                        <Image 
                            src="/svgstemuslims.svg" 
                            alt="STEM Muslims Logo" 
                            width={150} 
                            height={50} 
                            className={styles.logoImg}
                            priority
                        />
                        <span className={styles.logoText}>STEM Muslims</span>
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <button 
                    onClick={toggleMenu} 
                    className={`${styles.toggleButton} ${menuActive ? styles.active : ""}`}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Desktop & Mobile Menu */}
                <div className={`${styles.navMenu} ${menuActive ? styles.active : ""}`}>
                    {links.map(([titleName, titleRoute, dropdownItems], index) => (
                        dropdownItems === undefined ? (

                            <div key={String(titleRoute)} className={`${styles.navItem} ${isActive(titleRoute as string) ? styles.active : ""}`}>
                                <Link href={titleRoute as string} className={styles.navLink}>
                                    {titleName}
                                </Link>
                            </div>
                        ) : (
                            <div 
                                key={String(titleRoute)} 

                                className={`${styles.navItem} ${styles.hasDropdown} ${
                                    isActive(titleRoute as string) || isDropdownActive(dropdownItems as string[][]) ? styles.active : ""
                                }`}
                            >
                                <Link href={titleRoute as string} className={styles.navLink}>
                                    {titleName}
                                </Link>
                                <button 
                                    className={`${styles.dropdownToggle} ${expandedSubmenu === index ? styles.active : ''}`}
                                    onClick={(e) => toggleSubmenu(index, e)}
                                    aria-label={`Toggle ${titleName} submenu`}
                                >
                                    <svg 
                                        width="10" 
                                        height="6" 
                                        viewBox="0 0 10 6" 
                                        fill="none" 
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={styles.dropdownArrow}
                                    >
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                                <div className={`${styles.dropdownContent} ${expandedSubmenu === index ? styles.show : ''}`}>
                                    {(dropdownItems as string[][]).map(([itemName, itemRoute]) => (
                                        <Link 
                                            key={itemRoute} 
                                            href={itemRoute} 
                                            className={`${styles.dropdownItem} ${isActive(itemRoute) ? styles.active : ""}`}
                                        >
                                            {itemName}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
} 