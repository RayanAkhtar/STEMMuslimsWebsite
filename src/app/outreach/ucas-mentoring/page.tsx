import styles from "./ucas-mentoring.module.scss";
import UCASMasonry from "./masonry";
import Testimonials from "./testimonials";

export default function UCASMentoring() {
  return (
    <>
      <div className={styles.contentContainer}>
        <h1>Ucas Mentoring</h1>
      </div>

      <div className={styles.ucasContainer}>
        <div className={styles.masonryContainer}>
          <UCASMasonry />
        </div>
        <hr className={styles.hr} />
      </div>

      <Testimonials />
    </>
  );
}
