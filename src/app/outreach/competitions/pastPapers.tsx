import styles from "./competitions.module.scss";
import { Download } from "lucide-react";

export default function PastPapers() {
  return (
    <>
      <div className={styles.pastPapers}>
        <h1>Problems and Solutions to past years</h1>

        <PastPaper />
      </div>
    </>
  );
}

function PastPaper() {
  return (
    <>
      <div>
        <h1>2024/5</h1>
        <details className={styles.details}>
          <summary className={styles.paperSummary}>
            STEM Muslims Competition 2024
          </summary>
          <p className={styles.congratsMessage}>
            Congratulations to <strong>Forest Gate Community School</strong>,
            our 2024 winner!
          </p>
          <a
            href="/Outreach/competition/past_papers/december_2024.zip"
            download
            className={styles.downloadLink}
          >
            <Download size={16} /> Download STEM Muslims Competition 2024
            Material (ZIP){" "}
          </a>
        </details>
      </div>
    </>
  );
}
