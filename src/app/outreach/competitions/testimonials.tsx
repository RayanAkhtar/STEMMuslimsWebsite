import styles from "./competitions.module.scss";

export default function Testimonials() {
  return (
    <>
      <div className={styles.testimonialContainer}>
        {/** testimonials class */}

        <div className={styles.testimonial}>
          {" "}
          {/** individual testimonial */}
          <div className={styles.imgWrapper}>
            <img src="/outreach/competitions/students_working_2_2526.webp" />
          </div>
          <p>
            {" "}
            Testimonial goes here Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum
            Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem
            ipsum Lorem ipsum Lorem ipsum{" "}
          </p>
        </div>
      </div>
    </>
  );
}
