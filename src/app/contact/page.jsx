import React from 'react';
import styles from './contact.module.scss';
import { StemmEmail } from '@/lib/globalVariables';
import { StemmInsta } from '@/lib/globalVariables';
import { ISocFB } from '@/lib/globalVariables';
import Link from 'next/link';

export default function ContactUs() {
    return (
        <div className={styles.contactContainer}>
            <div style={{ backgroundColor: '#F9F4EF', padding: '23px 0', textAlign: 'center' }}>
                <h1 className={styles.header}>CONTACT US</h1>
                <p className={styles.subheader}>Follow us on our socials!</p>
            </div>
           
                
            <div className={styles.whiteSection}> 
                <p className={styles.message}>For any inquiries, suggestions, or<br />
                    collaborations, feel free to send us <br />
                    a DM or email!!</p>

                <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', paddingBottom:'60px'}}>
                    <Link href="/outreach/contact" className={styles.emailButton}>
                        For schools interested in our outreach program
                    </Link>
                </div>

                <div className={styles.socialIcons}>
                    <a href="https://www.instagram.com/stem.muslims/" target="_blank" rel="noopener noreferrer">
                        <img src="/socials-icon/instagram.png" alt="Instagram" />
                    </a>
                    <a href="https://www.linkedin.com/company/stem-muslims-imperial-college-london" target="_blank" rel="noopener noreferrer">
                        <img src="/socials-icon/linkedin.png" alt="Linkedin" style={{width: "100px", height: "auto"}} />
                    </a>
                </div>
            </div>   
            <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px 0'}}>
                <a href="mailto:stemmuslims@hotmail.com" className={styles.emailButton}>
                    Click to send us an email!
                </a>
                <p className={styles.footerLink}>
                    Link Tree: <a href="https://linktr.ee/stemmuslims">Stemmuslims</a>
                </p>
            </div>
        </div>

    );
}