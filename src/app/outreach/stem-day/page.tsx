import styles from "./stem-day.module.scss";
import StemDayMasonry from "./masonry";

export default function StemDay() {
  return (
    <>
      <div className={styles.contentContainer}>
        <h1>STEM Day</h1>
      </div>

      <div className={styles.stemDayContainer}>
        <div className={styles.masonryContainer}>
          <StemDayMasonry />
        </div>
      </div>
    </>
  );
}
