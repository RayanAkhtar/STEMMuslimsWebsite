"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./home.module.scss";
import Logo from "../../../public/ISoc.svg";
import Link from "next/link";
import { isoclink } from "@/lib/globalVariables";

interface Location {
  name: string;
  directions: string[];
  videoLink?: string;
  imgLink?: string;
  imgRedirect?: string;
}

const locations: Location[] = [
  {
    name: "South Kensington",
    directions: [
      "<strong>Brothers:</strong> 14B Princes Garden, London SW7 1NA",
      "<strong>Sisters:</strong> 15B Princes Gardens, London SW7 1NA",
      `<strong>Important:</strong> Access to prayer rooms require keycard access, click <a href='${isoclink}'>here</a> to request access.`,
      "<strong>Please note:</strong> These rooms are for Imperial student and staff use only. For external visitors, please contact the ISoc committee.",
    ],
    videoLink: "https://youtu.be/3R290Pn7QCc",
    imgLink: "/life/SKmap.png",
    imgRedirect: "https://maps.app.goo.gl/f17ndS1fm4kyUtmR8",
  },
];

export default function PrayerRoomsServer() {
  const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number }>({
    width: 1200,
    height: 1000,
  });

  useEffect(() => {
    setImgDimensions({ width: 1200, height: 1000 });
  }, []);

  return (
    <div className={styles.container_directions}>
      <div className={styles.container_image}>
        <Link href={locations[0].imgRedirect || ""}>
          <Image
            className={styles.img}
            src={locations[0].imgLink || Logo}
            width={imgDimensions.width}
            height={imgDimensions.height}
            alt="logo"
          />
        </Link>
      </div>
      <div className={styles.container_arrange_info}>
        <div className={styles.container_info}>
          <h3 className={styles.subheading}>Prayer Room Directions</h3>
          <h1 className={styles.heading}>{locations[0].name}</h1>
          <div className={styles.info_text}>
            <div>
              {locations[0].directions.map((direction, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: direction }}></p>
              ))}
            </div>
          </div>
          {locations[0].videoLink && (
            <div className={styles.links}>
              <Link href={locations[0].videoLink || ""} className={styles.redirectButton}>
                VIDEO DIRECTIONS
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}