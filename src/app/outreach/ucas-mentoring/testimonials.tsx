import styles from "./ucas-mentoring.module.scss";

const Testimonials = () => {
  const muhammadText: string = `
    ... greatly supported me throughout the entire UCAS process, from applications to finalising offers.
    My mentor provided invaluable guidance, helping me refine and enhance my personal statement, offering advice on where to apply, and answering numerous questions I had along the way...
    Muhammad, 1st Year Maths, 2024`;

  const secondText: string = `
    I joined this scheme with absolutely no idea what I wanted to do with my career.
    At the time, I had chosen chemical engineering and was paired with someone in the field.
    However, the scheme provided me with so much more than I expected! I received invaluable advice on medicine interviews, dentistry applications, computer science degrees, and even apprenticeships.
    Best of all, my mentor was incredibly kind and went out of her way to ensure I had everything I needed!
    Even if you're completely clueless like I was, this scheme will help discover the right path for you!
    Student`;

  const thirdText: string = `
    I applied to this mentorship scheme as part of my preparation for applying to Computer Science at Imperial College London.
    I expected it to provide guidance on strengthening my application, and it has been incredibly helpful.
    The mentor that was associated to me gave me valuable feedback on my personal statement,
    helping me understand what the university admissions team would expect and appreciate more.
    Whenever I had questions, I could just ask her, and she would always provide clear answers,
    which made me feel more confident and less stressed about the process.`;

  return (
    <>
      <div className={styles.testimonials}>
        <div className={styles.testimonial}>
          <img src="/Outreach/UCAS_Mentorship/woman.webp" />
          <p style={{ whiteSpace: "pre-line" }}>{secondText}</p>
        </div>

        <div className={styles.testimonial}>
          <img src="/Outreach/UCAS_Mentorship/man.webp" />
          <p style={{ whiteSpace: "pre-line" }}>{muhammadText}</p>
        </div>

        <div className={styles.testimonial}>
          <img src="/Outreach/UCAS_Mentorship/woman.webp" />
          <p style={{ whiteSpace: "pre-line" }}>{thirdText}</p>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
