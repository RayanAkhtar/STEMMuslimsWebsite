"use client"; // needed to render masonry
import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./Layout.module.scss";

import dynamic from "next/dynamic";

interface LayoutProps {
  title?: string;
  headerImage?: StaticImageData;
  headerColour?: string;
  description: string;
}

const Layout: React.FC<LayoutProps> = ({
  title = "Default Title",
  headerImage,
  headerColour,
  description,
}) => {
  const headerStyles = {
    ...(headerImage
      ? { headerImage: `url(${headerImage})` }
      : { headerColour: headerColour || "#333" }), // Use fallback color
  };

  return (
    <div className={styles.layout}>
      <header
        className={`${styles.header} ${headerImage ? styles.withImage : ""} ${styles.textHighlight}`}
      >
        {headerImage && (
          <Image
            src={headerImage}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className={styles.headerImage}
          />
        )}
        <h1 className={styles.headerText}>{title}</h1>
      </header>
      <div className={`${styles.contentBox}`}>{description}</div>
      <div className={styles.outreachContainer}>
        <div className={styles.masonryContainer}>
          <StemDayMasonry />
        </div>
      </div>

      <main>
        <h1>{title}</h1>
        {description}
      </main>
    </div>
  );
};

export default Layout;

function StemDayMasonry() {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 1 }}>
      <Masonry gutter="40px">
        <MainContent
          title="Description goes here"
          description="Description..."
          imageSrc="/Outreach/stemDay.jpg"
        />
      </Masonry>
    </ResponsiveMasonry>
  );
}

const MainContent = ({
  title,
  description,
  imageSrc,
}: LayoutProps & { imageSrc?: string }) => {
  return (
    <div className={styles.outreachCard}>
      <div className={styles.cardContent}>
        <div className={styles.descriptionContent}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        {imageSrc && (
          <img className={styles.cardImage} src={imageSrc} alt={title} />
        )}
      </div>
    </div>
  );
};

const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false }
);
const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false }
);

// interface StemDayCardTypes {
//     title: string;
//     text: string;
//     imageSrc?: string;
// }

// export default function StemDay() {
//     return (

//         <>
//         <div className={styles.contentContainer}>
//             <h1>Stem Day</h1>

//         </div>

//         <div className={styles.contentBox}>

//             <p>Description goes here</p>

//         </div>
//         <div className={styles.outreachContainer}>
//                 <h1>Activities</h1>
//                 <div className={styles.masonryContainer}>
//                     <StemDayMasonry />
//                 </div>
//             </div>
//         </>
//     );
// }

// function StemDayMasonry(){
//     return(
//         <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 1}}>
//             <Masonry gutter="40px">
//                 <StemDayCard
//                 title = "Description goes here"
//                 text = "Description..."
//                 imageSrc="/Outreach/stemDay.jpg"
//                 />

//             </Masonry>
//         </ResponsiveMasonry>
//     )
// }

// const StemDayCard = ({ title, text, imageSrc }: StemDayCardTypes & { imageSrc?: string }) => {
//     return (
//         <div className={styles.outreachCard}>
//             <div className={styles.cardContent}>
//                 <div className={styles.textContent}>
//                     <h1>{title}</h1>
//                     <p>
//                         {text}
//                     </p>

//                 </div>

//                 {imageSrc && <img className={styles.cardImage} src={imageSrc} alt={title} />}
//             </div>

//         </div>
//     );
// }
