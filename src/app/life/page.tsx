"use client" // needed to render masonry
import styles from "./life.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
const ResponsiveMasonry = dynamic(() => import('react-responsive-masonry').then(mod => mod.ResponsiveMasonry), { ssr: false });
const Masonry = dynamic(() => import('react-responsive-masonry').then(mod => mod.default), { ssr: false });

interface LifeCardTypes {
    title: string;
    text: string;
    link: string;
}

function LifeMasonry() {
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3}}
        >
            <Masonry gutter="20px">
                <LifeCard
                    title="Prayer Rooms"
                    text="Alhamdulillah, we have a prayer room in each of our campuses. These areas serve as a space for our members to be able to worship in peace, and safely. On this page you will find the locations and guidelines, as well as the request access form."
                    link="home#prayerrooms"
                />
                <LifeCard
                    title="Jumu'ah Salah"
                    text="Held every Friday in Beit Hall, Jumu'ah is one of our members' favourite days. Listening and praying side by side, there is no better way to stengthen the ummah."
                    link="/life/jumuah"
                />
                <LifeCard
                    title="Halal Food"
                    text="Living in central London, there is a wealth of places for halal eating both in and outside university. Find out where you can satisfy your hunger, while maintaining your deen!"
                    link="/life/halal-food"
                />
                <LifeCard
                    title="Tarbiyyah"
                    text="We offer a diverse range of talks and reminders specifically designed to enhance your imaan (faith). Engaging sessions that encourage deep reflection and exploration of various aspects of the faith, enabling you to discover ways to strengthen your connection with Allah."
                    link="/life/tarbiyyah"
                />
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default function LifeAtUni() {
  return (
    <>
      <div className={styles.pageIntroduction}>
        <div className={styles.pageIntroductionContainer}>
          <div className={styles.pageIntroductionContent}>
            <h1> The Uni Life </h1>
            <p>
              <br />
              Whether you are moving away from home, or commuting, university
              can be daunting and we understand that the experience can feel
              overwhelming. That's why we've put together a set of pages to
              address some of your concerns and make your transition easier.
              From finding a peaceful place to pray to satisfying your hunger
              after a long day of lectures, this page is here to assist you
              every step of the way.
            </p>
          </div>
          <div className={styles.pageIntroductionImage} />
        </div>
      </div>
      <div className={styles.lifeAtUniContainer}>
        <h1>Our Services</h1>
        <div className={styles.masonryContainer}>
          <LifeMasonry />
        </div>
      </div>
      <div className={styles.remindersContainer}></div>
    </>
  );
}

const LifeCard = ({ title, text, link }: LifeCardTypes) => {
    return (
        <div className={styles.lifeCard}>
            <h1>{title}</h1>
            <p>
                {text} 
            </p>
            <Link href={link} passHref>
                <button> Read More {'>'} </button>
            </Link>
        </div>
    );
};