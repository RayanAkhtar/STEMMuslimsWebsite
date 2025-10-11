"use client";
import styles from "./competitions.module.scss";
import dynamic from "next/dynamic";

const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false }
);
const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false }
);

interface CompetitionsCardTypes {
  title: string;
  text: string;
  imageSrc1?: string;
  imageSrc2?: string;
}

const CompetitionsMasonry = () => {
  const desc: string = `In December 2024, STEM Muslims hosted our first-ever STEM Competition, where we had sixty students from schools across London participating.
    The event was designed to challenge participants to apply their scientific knowledge beyond the classroom. The rounds included interactive problems that emphasised critical thinking, problem-solving, and the ability to interpret data such as spectra and flow-charts, and quickly apply.
    With a focus on fostering collaboration, participants worked in teams to tackle the challenges, learning from one another in the process, with guidance and hints from our undergraduate volunteers.
    The competition was a resounding success, and reflected our commitment to nurturing the next generation of scientists and innovators.`;

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 1 }}>
      <Masonry gutter="40px">
        <CompetitionsCard
          title="STEM Competition: Think, Innovate, Compete!"
          text={desc}
          imageSrc1="/Outreach/competition/lollipop_tower_2024.webp"
          imageSrc2="/Outreach/competition/students_working_2_2024.webp"
        />
      </Masonry>
    </ResponsiveMasonry>
  );
};

const CompetitionsCard = ({
  title,
  text,
  imageSrc1,
  imageSrc2,
}: CompetitionsCardTypes & {
  imageSrc1?: string;
  imageSrc2?: string;
}) => {
  return (
    <div className={styles.competitionCard}>
      <div className={styles.cardContent}>
        <div className={styles.textContent}>
          <h1>{title}</h1>
          <p style={{ whiteSpace: "pre-line" }}>{text}</p>
        </div>

        <div className={styles.cardImageContainer}>
          {imageSrc1 && (
            <img className={styles.cardImage} src={imageSrc1} alt={title} />
          )}
          {imageSrc2 && (
            <img className={styles.cardImage} src={imageSrc2} alt={title} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitionsMasonry;
