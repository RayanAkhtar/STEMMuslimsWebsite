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
            <img src="/Outreach/stemDay.jpg" />
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
