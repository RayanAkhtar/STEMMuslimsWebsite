"use client"
import styles from "./ucas-mentoring.module.scss";
import dynamic from 'next/dynamic';


const ResponsiveMasonry = dynamic(() => import('react-responsive-masonry').then(mod => mod.ResponsiveMasonry), { ssr: false });
const Masonry = dynamic(() => import('react-responsive-masonry').then(mod => mod.default), { ssr: false });


interface UCASCardTypes {
    title: string;
    text: string;
    imageSrc?: string;
}

const UCASMasonry = () => {
    const text: string = `
    Now in its second successful year, our UCAS Mentorship Scheme pairs Year 13 students with current Imperial undergraduates studying the subject they are applying for.
    From perfecting personal statements to excelling in challenging interviews, our mentors provide tailored, insider guidance through every stage of the university application process.
    With their first-hand experience, they offer invaluable advice to help prospective students confidently navigate their journey to Imperial.
    Having already supported over 100 students, our mentorship program continues to empower aspiring applicants, giving them the tools and insights needed to secure their place at one of the world’s leading institutions.`

    return(
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 1}}>
            <Masonry gutter="40px">
                <UCASCard
                title = " Guiding the Next Generation of Imperial Students"
                text = {text}
                />
            </Masonry>
        </ResponsiveMasonry>
    )
}


// need to add paragraph breaks
const UCASCard = ({ title, text, imageSrc }: UCASCardTypes & { imageSrc?: string }) => {
    return (
        <div className={styles.outreachCard}>
            <div className={styles.cardContent}>
                <div className={styles.textContent}>
                    <h1>{title}</h1>
                    <p style={{ whiteSpace: "pre-line" }}>{text}</p>
                </div>
            </div>

        </div>
    );
}

export default UCASMasonry