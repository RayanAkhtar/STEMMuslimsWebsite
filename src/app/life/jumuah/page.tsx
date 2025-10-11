import React, { useState } from 'react';
import styles from './jumuah.module.scss';
import { Cinzel_Decorative } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import SKmap from './SKmap.png';

const cinzel_decorative = Cinzel_Decorative({
  weight: ['400', '700'],
  subsets: ['latin'],
});



const JumahPage: React.FC = () => {
  return (
    <div className={styles.jumahContainer}>
      <section className={styles.item1}>
        <h1 className={`${cinzel_decorative.className} ${styles.title}`}>
          <b>JUMu’ah prayer</b>
        </h1>
        <h3 className={styles.h3}>
          <em>Friday prayer at Imperial College Islamic Society</em>
        </h3>
      </section>

      <section className={styles.arab}>
        <div className={styles.div1}>
          <h2 className={styles.div1}>
            <b>‏اَلسَلامُ عَلَيْكُم وَرَحْمَةُ اَللهِ وَبَرَكاتُهُ‎</b>
          </h2>
        </div>
        <div className={styles.div2}>
          <p>62:9</p>
          <p>
            يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا نُودِىَ لِلصَّلَوٰةِ مِن يَوْمِ ٱلْجُمُعَةِ فَٱسْعَوْا۟ إِلَىٰ ذِكْرِ ٱللَّهِ وَذَرُوا۟ ٱلْبَيْعَ ۚ ذَٰلِكُمْ خَيْرٌۭ لَّكُمْ إِن كُنتُمْ تَعْلَمُونَ ٩
          </p>
          <p>
            O you who have believed, when [the adhān] is called for the prayer on the day of Jumuʿah [Friday], then proceed to the remembrance of Allāh and leave trade. That is better for you, if you only knew
          </p>
        </div>
      </section>

      <section className={styles.prayer}>
        <h2>
          <b>Jumu'ah Prayer:</b>
        </h2>
        <p>
          Alhamdulilah, ISOC organises weekly Jumu’ah on campus every Friday during term-time to ensure students, staff and others who are close to the University centre are able to attend.
        </p>
        <p>
          The time and location is subject to availability, so keep an eye on our WhatsApp announcement chats for updates each week. The usual location is the 1st level of Beit Hall. Jumu'ah is also done in the PR (South Kensington Campus Prayer Room) but again is subject to availability. Please check the WhatsApp chats for the latest updates. For Jumu'ah availability in the other campuses please discuss with the people onsite closer to the time Insha'Allah.
        </p>
      </section>



      {/* <section className={styles.buttonsSection}>
        <div className={styles.buttonContainer}>
          <Link className={styles.link} href="/">
            Locations
          </Link>
          <Link className={styles.link} href="/">
            Guidelines
          </Link>
          <Link className={styles.link} href="/">
            Reminders
          </Link>
        </div>
      </section> */}


      <div className={styles.colour}>
      <section className={styles.directions}>
      <div className={styles.container_image}>
        <Image
          className={styles.img}
          src={SKmap}
          width={375}
          height={350}
          alt="logo"
        />
      </div>
        

        <div className={styles.info}>
            <h2>
              <b>Jummah location directions:</b>
            </h2>
            <p ><b>Brothers</b>: Beit Hall first floor.</p>
            <p ><b>Sisters</b>: 3rd floor Beit Hall. </p>
            <p>Direction Link:<Link className={styles.LocationLink} href="https://www.google.com/maps/place/Beit+Hall+(Imperial+Summer+Accommodation)/@51.5000763,-0.178279,18z/data=!4m6!3m5!1s0x4876054383c4fdb3:0x8f7a517473982084!8m2!3d51.4999388!4d-0.1780609!16zL20vMDNzbHly?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D">
           <u>Beit Hall (Imperial Summer Accommodation) - Google Map</u>
            </Link></p>


          <Link className={styles.videodirections} href="/">
            Video Directions
          </Link>
        </div>
      </section>

      
      <hr className={styles.shortLine} />


        <div className={styles.guide}>
        <section className={styles.guidlines}>
          <h2 className={styles.titleguidlines}><b>Jummah Guidelines:</b></h2>
          <ul className={styles.ul}>
            <li className={styles.li}>Arrive early to prepare for the prayer</li>
            <li className={styles.li} >Perform ablution (wudhu) before attending</li>
            <li className={styles.li}>Listen attentively to the khutbah (sermon)</li>
            <li className={styles.li}>Maintain silence during the sermon</li>
          </ul>
        </section>
        </div>

      <hr className={styles.shortLine} />
      

      <section className={styles.lastsection}>
        

        <h2 className={styles.sunnah}><b>Friday Sunnah & Reminders:</b></h2>
        <ul className={styles.reminders}>
          <li className={styles.list}><b>Recite Surah al kahf</b></li>
          <li className={styles.list}><b>Send Salawat upon the Prophet ﷺ</b></li>
          <li className={styles.list}><b>Sa’at al-istijabah (asr to maghrib dua)</b></li>
          <li className={styles.list}><b>Perform Ghusl (bath)</b></li>
        </ul>
      </section>
    </div>
    </div>
  );
};

export default JumahPage;
