"use client";
import styles from "./stem-day.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import exp from "constants";

const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false }
);
const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false }
);

interface StemDayCardTypes {
  title: string;
  text: string;
  imageSrc1?: string;
  imageSrc2?: string;
}

const StemDayMasonry = () => {
  const desc = `STEM Day is an inspiring opportunity for Year 12 students who are passionate about science and engineering to experience life at Imperial.
    Participants enjoy an exclusive tour of the cutting-edge research facilities available, including the flight simulator in the Department of Aeronautics and the advanced 3D printing labs in the Department of Material Science.
    The day features hands-on workshops designed to give students a taste of undergraduate-level learning. From building cars to engineering innovative bridges, these practical sessions encourage creativity, problem-solving, and teamwork.
    Throughout the event, our friendly undergraduate volunteers share their experiences with the students and answer questions about studying at Imperial, university life, and the wide range of courses we offer.`;

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 1 }}>
      <Masonry gutter="40px">
        <StemDayCard
          title="Explore, Innovate, and Experience Imperial"
          text={desc}
          imageSrc1="/Outreach/stemday/making_car_2.webp"
          imageSrc2="/Outreach/stemday/flight_sim_2.webp"
        />
      </Masonry>
    </ResponsiveMasonry>
  );
};

const StemDayCard = ({
  title,
  text,
  imageSrc1,
  imageSrc2,
}: StemDayCardTypes & {
  imageSrc1?: string;
  imageSrc2?: string;
}) => {
  return (
    <div className={styles.outreachCard}>
      <div className={styles.cardContent}>
        <div className={styles.textContent}>
          <h1>{title}</h1>
          <p style={{ whiteSpace: "pre-line" }}>{text}</p>
        </div>

        <div className={styles.cardImageContainer}>
          {imageSrc1 && <img className={styles.cardImage} src={imageSrc1} />}
          {imageSrc2 && <img className={styles.cardImage} src={imageSrc2} />}
        </div>
      </div>
    </div>
  );
};

export default StemDayMasonry;
