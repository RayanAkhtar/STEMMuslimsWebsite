"use client"; // needed to render masonry
import styles from "./outreach.module.scss";

import Link from "next/link";
import dynamic from "next/dynamic";
const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false }
);
const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false }
);

interface OutreachCardTypes {
  title: string;
  text?: string;
  link: string;
  imageSrc?: string;
}

function OutreachMasonry() {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 1 }}>
      <Masonry gutter="40px">
        <OutreachCard
          title="STEM Day: Explore, Innovate, and Experience Imperial"
          link="outreach/stem-day"
          imageSrc="/Outreach/stemday/flight_sim_1.webp"
        />
        <OutreachCard
          title="UCAS Mentorship Scheme: Guiding the Next Generation of Imperial Students"
          link="outreach/ucas-mentoring"
          imageSrc="/Outreach/UCAS_Mentorship/UCAS_logo.webp"
        />
        <OutreachCard
          title="STEM Competition: Think, Innovate, Compete!"
          link="outreach/competitions"
          imageSrc="/Outreach/competition/students_working_1_2024.webp"
        />
        <OutreachCard
          title="Join our mailing list!"
          link="outreach/subscribe"
          imageSrc="/Outreach/mailing/mailing_list_icon.webp"
        />
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default function OutreachAndWellbeing() {
  return (
    <>
      <div className={styles.pageIntro}>
        <div className={styles.pageIntroContainer}>
          <div className={styles.pageIntroContent}>
            <h1>Outreach</h1>
            <p>
              <br />
              The Prophet Muhammad ﷺ instructed us to{" "}
              <span>"Love for humanity what you love for yourself."</span>
              <br />
              <br />
              This Prophetic Tradition drives us to be dedicated to the
              wellbeing of everyone - wanting goodness and guidance for
              everyone. Our O&W programmes facilitate this, focusing on student
              welfare and also giving back to the wider community.
            </p>
          </div>
          <div className={styles.pageIntroImage} />
        </div>
      </div>
      <div className={styles.outreachContainer}>
        <h1>Our Programmes</h1>
        <div className={styles.masonryContainer}>
          <OutreachMasonry />
        </div>
      </div>
    </>
  );
}

const OutreachCard = ({
  title,
  text,
  link,
  imageSrc,
}: OutreachCardTypes & { imageSrc?: string }) => {
  return (
    <div className={styles.outreachCard}>
      <div className={styles.cardContent}>
        <div className={styles.textContent}>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
          <Link href={link} passHref>
            <button>Read More {">"}</button>
          </Link>
        </div>

        {imageSrc && (
          <div className={styles.cardImage}>
            <img src={imageSrc} />
          </div>
        )}
      </div>
    </div>
  );
};
