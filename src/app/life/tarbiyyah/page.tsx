"use client";
import React,{ useState } from 'react';
import Image from 'next/image';
import Roots from "../../../../public/Tarbiyyah/roots.png";
import Quran from "../../../../public/Tarbiyyah/quran_new.png";
import styles from './tarbiyyah.module.scss';

const TarbiyyahPage: React.FC = () => {

  const [isFirstText, setIsFirstText] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const [isFirstLabel, setIsFirstLabel] = useState(true);
  const [isRotated, setIsRotated] = useState(false);

  const handleChangeText = () => {
    setIsFading(true);

    setTimeout(() => {
      setIsFirstText(!isFirstText);
      setIsFading(false);
      setIsInverted(!isInverted);
      setIsFirstLabel(!isFirstLabel);
      setIsRotated(!isRotated)
    }, 400);
  };

  // const handleRotation = () => {
  //   setIsRotated(!isRotated);
  // }

  const handleAnimations = () => {
    // handleRotation();
    handleChangeText();
  }

  return (
    <>
      <div className={styles.Top}>
        <h1 className={styles.title}>Tarbiyyah</h1>
        <div className={styles.subtitle}>
          <p>Spiritual development programs within ISOC</p>
        </div>
      </div>
      <div className={styles.container}>
        <h1 className={styles.about}>What is Tarbiyyah?</h1>
        <div className={styles.carousel}>
          <div className={`${styles.desc_div} ${isFading ? styles.desc_div_hidden : styles.desc_div}`}>
            {isFirstText ? (
              <div><p className={styles.description}><b>Tarbiyyah (تربية) </b> is an Arabic term that refers to development, education, and nurturing.</p> 
              <p className={styles.description}> It is more than just academic learning- tarbiyyah is about building a strong connection with Allah ﷻ. It is about nurturing one’s soul, developing akhlaq (good manners), and embodying Islam in your daily life.</p></div>
            ) : (
              <div><p className={styles.description}> <b>Tarbiyyah</b> helps Muslims grow spiritually, morally, and intellectually, and to become individuals who contribute positively to their communities. </p> <p className={styles.description}> It involves not only gaining knowledge, but also applying that knowledge in the way that you carry yourself and how you treat others. </p> <p className={styles.description}> Central to this is surrounding yourself with good company, where Muslims can support and uplift each other in their journey towards Allah ﷻ.</p></div>
            )}
          </div>
          <div className={styles.btn_div} onClick={handleAnimations}>
            <div className={styles.arrow_div} style={{ transform: isRotated ? 'rotateY(180deg)' : 'rotateY(0deg)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M4 4L21 21" stroke="#772119" stroke-width="8" stroke-linecap="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M22 4L4 22" stroke="#772119" stroke-width="8" stroke-linecap="round"/>
              </svg>
            </div>
            <div className={styles.textbox}>
              {isFirstLabel ? (<p className={`${styles.btn_text} ${isFading ? styles.btn_text_hidden : styles.btn_text}`} >More info</p>) : (<p className={`${styles.btn_text} ${isFading ? styles.btn_text_hidden : styles.btn_text}`} >Go Back</p>)}
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.break}></hr>
      <div className={styles.activities}>
        <h1 className={styles.inISOC}>Tarbiyyah within ISOC</h1>
        <div className={styles.examples}>
          <div className={styles.example}>
            <div className={styles.Img}>
              <Image
                // className={styles.rootsImg}
                src={Roots}
                width={247}
                height={235}
                alt="Roots"
              />
            </div>
            <div className={styles.para}>
              <h2 className={styles.paraTitle}>Roots Academy: </h2>
              <p className={styles.exampleDesc}>Build your Islamic knowledge and gain suhba (companionship) by
              <b className={styles.exampleDescBold}> attending classes provided by Roots Academy. </b> </p>
              <p className={styles.exampleDesc}> Gain insight into the Quran, the life of the Prophet ﷺ and become closer to both Allah (SWT) and your fellow Muslims.</p>
              <p className={styles.exampleDesc}>Time and Location is updated weekly on the whatsapp announcement chats.</p>
            </div>
            <div className={styles.sunnahDiv}>
              <p className={styles.sunnah}>The Messenger of Allah (ﷺ) said: "Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him. Grade: Sahih (Darussalam) Ref : <a className={styles.sunnahLink} href='https://sunnah.com/tirmidhi:2646'>Jami` at-Tirmidhi 2646</a></p>
            </div>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.example}>
            <div className={styles.Img}>
              <Image
                  // className={styles.rootsImg}
                  src={Quran}
                  width={247}
                  height={235}
                  alt="Quran"
                />
            </div>
            <div className={styles.para}>
              <h2 className={styles.paraTitle}>Weekly Quran Halaqah</h2>
              <p className={styles.exampleDesc}>Weekly Quran Halaqah: Join us for <b> a weekly Quran recitation circle after jumu’ah in the PR. </b></p> 
              <p className={styles.exampleDesc}> Build a connection with your fellow Muslim brothers and, most importantly, a connection with the book of Allah (swt). </p> 
              <p className={styles.exampleDesc}> A Quran Circle is also held for sisters on Mondays in the PR. Sisters, join the GC for more details</p>
            </div>
            <div className={styles.verseDiv}>
              <p className={styles.verseNum}> 73:4 </p>
              <p className={styles.verse}> أَوْ زِدْ عَلَيْهِ وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا ٤ </p>
              <p className={styles.verse}>  Or add to it, and recite the Qur’ān with measured recitation. </p>
              <br></br>
              <p className={styles.verse}>  — Saheeh International </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TarbiyyahPage;