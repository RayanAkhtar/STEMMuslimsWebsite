import styles from "./competitions.module.scss";
import CompetitionsMasonry from "./masonry";
// import Testimonials from './testimonials'
import PastPapers from "./pastPapers";

export default function Competitions() {
  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.backgroundImage}>
          <h1>Competitions</h1>
        </div>
        <div className={styles.masonryContainer}>
          <CompetitionsMasonry />
        </div>
        <hr />
        {/* <Testimonials/> */}
        <PastPapers />
      </div>
    </>
  );
}
