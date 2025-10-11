"use client"

import styles from "./halal-food.module.scss";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from "react";
import DOMPurify from 'isomorphic-dompurify'; {/* npm install isomorphic-dompurify*/}
const ResponsiveMasonry = dynamic(() => import('react-responsive-masonry').then(mod => mod.ResponsiveMasonry), { ssr: false });
const Masonry = dynamic(() => import('react-responsive-masonry').then(mod => mod.default), { ssr: false });

interface MasonryCardTypes {
    title: string;
    introduction: string;
    directions: string;
    notes?: string;
}

function SKCampus() {
    return(
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry>
                <MasonryItem
                    title="Fusion"
                    introduction="Various hot food"
                    directions="Located on Sherfield Walkway opposite the merch shop"
                    notes="Decently priced with lots of options and good portion sizes.
                    Different stuff everyday. <br /><br />
                    Open till 2.30pm"
                />
                <MasonryItem
                    title="Kokoro"
                    introduction="Japanese hot food and sushi"
                    directions="Located in Sherfield building at the H-bar"
                    notes="All branches serve halal chicken and beef according to them.
                    Usually around £6-£8 for a meal, good portions and quality. <br /><br />
                    Open till 8pm."
                />
                <MasonryItem
                    title="Library Cafe"
                    introduction="Something different every day"
                    directions="Ground floor libary"
                    notes="Around £5-£7 for a meal. Ask what is halal, it's usually the chicken. Decent prices and quality. <br /><br />
                    Open till 8pm."
                />
                <MasonryItem
                    title="Loud Bird"
                    introduction="Fake Nandos"
                    directions="Ground floor Sir Alexander Fleming Building (SAF)" 
                    notes="Chicken is halal. £5.70 for a meal. Go early chicken runs out fast at lunchtime. <br /><br />
                    Closes at 2.30pm."
                />
                <MasonryItem
                    title="Senior Common Room"
                    introduction="High quality food"
                    directions="Sherfield Walkway"
                    notes="A lot of options, gets very busy at lunchtime. Check board for halal options.
                    Open for lunch till 2.30pm."
                />
            </Masonry>
        </ResponsiveMasonry>
    );
}

function SouthKen() {
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
            <Masonry>
                <MasonryItem
                    title="More than just Subs"
                    introduction="Sandwich Shop Inside South Kensington Station"
                    directions="Postcode: SW7 2LT
                    Distance from SK Campus: 5-10 min walk"
                    notes="The most inexpensive item is around £5 (no drink included), though prices change here frequently so please check beforehand. It is similar to a Subway. <br /><br />
                    The BBQ chicken sub is a good and comparatively inexpensive lunch in the menu."
                />
                <MasonryItem
                    title="Chopstix"
                    introduction="Noodle/rice shop next to South Kensington Station"
                    directions="Postcode: SW7 2LT
                    Distance from SK Campus: 5-10 min walk"
                    notes="Prepare to spend at least around £6 (with no drink). They offer noodles and rice mains. <br /><br />
                    On some delivery apps they seem to have a secret shop inside the shop called Yangtze which is cheaper and has bigger portions (not really sure why). Bear in mind there are some reports that their halal meat is stunned."
                />
                <MasonryItem
                    title="Wingstop"
                    introduction="Wings Specialist"
                    directions="Postcode: SW7 4SS
                    Distance from SK Campus: 15 min walk"
                    notes="You can get boneless bites instead of wings. Be prepared to spend around at least around £10.
                    25% discount for NHS card holders."
                />
                <MasonryItem
                    title="Halal Guys"
                    introduction="Gyros and rice bowls"
                    directions="163-165 Earl's Court Road
                    Postcode: SW5 9RF
                    Distance from SK Campus: 25 min walk OR 15 min tube"
                />
                <MasonryItem
                    title="Nandos"
                    introduction="South African Chicken (High Street Kensington Branch)"
                    directions="Postcode: W8 6SA
                    Distance from SK Campus: 10-15 min walk OR 5 min bus"
                />
            </Masonry>
        </ResponsiveMasonry>
    );
}

function CharingCross() {
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
            <Masonry>
            <MasonryItem
                title="Chicago Grill"
                introduction="Grilled Burgers, Sandwiches and Milkshakes outside Hammersmith Station"
                directions="Postcode: W6 9PH
                Distance from CX Campus: 5-10 minute walk"
            />
            <MasonryItem
                title="German Doner Kebab"
                introduction="Doner Kebab shop in Fulham Broadway"
                directions="Postcode: SW6 1AA
                Distance from CX Campus: 25 min walk from CX Campus"
            />
            </Masonry>
        </ResponsiveMasonry>
    );
}

function StMarys() {
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
            <Masonry>
            <MasonryItem
                title="Tukdin"
                introduction="Malaysian restaurant in Paddington"
                directions="Postcode: W2 3BX
                Distance from St Mary’s Campus: 5 min walk"
            />
            <MasonryItem
                title="Banana Tree"
                introduction="Indo-Chinese restaurant in Paddington"
                directions="Postcode: W2 4UA
                Distance from St Mary’s Campus: 10 min walk"
            />
            <MasonryItem
                title="Chicken Cottage"
                introduction="Chicken and Chips near Paddington Station"
                directions="Postcode: W2 1RL
                Distance from St Mary’s Campus: 5 min walk"
            />
            <MasonryItem
                title="Tinseltown"
                introduction="Burgers and Milkshake in Bayswater"
                directions="Postcode: W2 4UA
                Distance from St Mary’s Campus: 10 min walk"
            />
            </Masonry>
        </ResponsiveMasonry>
    );
}

export default function HalalFood() {

    return (
        <>
            <div className={styles.pageContainer}>
                <h1> Halal Food </h1>
                <div className={styles.pageIntroduction}>
                    <p>Anyone who’s familiar with London knows that there is no shortage of halal food here!</p>
                    <p>
                        Click on the list of campuses below for halal restaurants/takeaways nearby handpicked by some of Imperial ISoc’s very best food critics.
                        <br />
                    </p>
                    <Link className={styles.link} href="#south-ken">1. South Kensington <br /></Link>
                    <Link className={styles.link} href="#charing-cross">2. Charing Cross <br /></Link>
                    <Link className={styles.link} href="#st-mary">3. St Mary's Hospital <br /></Link>
                    <p>
                        Another option is to download delivery apps such as: Uber Eats, Deliveroo or Just Eat and use the Halal filters to find halal food.
                    </p>
                    <p>
                        If you fancy cooking some dishes yourself, remember that a lot of major supermarkets sell packaged Halal meat, the nearest ones to SK Campus are:
                    </p>
                    <p>
                        Sainsburys (Earl's Court) - SW5 9QQ
                    </p>
                    <p>
                        Tesco (West Ken) – W14 8PB
                    </p>
                    <p>
                        There are also plenty of halal meet grocery shops along North End Road in Fulham.
                    </p>
                    <p>
                        If you don’t mind going on a bit of a trek make sure to visit places like Tooting, Whitechapel or Southall which have large Muslim communities and some of the best restaurants in the city. If you aren’t familiar with the area you are in, there are some great apps/websites to find local halal places to eat. These include:
                    </p>
                    <br />
                    <p>  <strong> - Zabihah</strong> </p>
                    <p>  <strong> - Scan Halal</strong> </p>
                    <p>
                        <br />
                        Another great website is <Link href="https://halalgems.com">http://halalgems.com</Link>, a superb guide to Halal eating in London
                    </p>
                </div>
                <div id="skcampus"> <h1> South Ken Campus</h1> </div>
                <div className={styles.SKcampusContainer}>
                    <SKCampus />
                </div>
                <div id="south-ken"><h1> South Kensington </h1></div>
                <div className={styles.southKenContainer}>
                    <SouthKen />
                </div>
                <h1 id="charing-cross"> Charing Cross</h1>
                <div className={styles.charingCrossContainer}>
                    <CharingCross />
                </div>
                <h1 id="st-mary"> St Mary's Hospital </h1>
                <div className={styles.stMarysContainer}>
                    <StMarys />
                </div>
            </div>
        </>
    );
}


function MasonryItem({ title, introduction, directions, notes }: MasonryCardTypes) {
    // Split the notes string into an array of strings, each string is a line
    var formattedNotes = notes ? notes.replace(/\n/g, '<br />') : "empty";

    // So the break tags inside the parameter are rendered as \n which gets replaced with <br /> above
    // I still don't know why, without it, the line spacing won't work
    // Sanitize the notes string to prevent XSS attacks
    formattedNotes = DOMPurify.sanitize(formattedNotes);

    return (
        <div className={styles.masonryItem}>
            <h1> {title} </h1>
            <p>
                {introduction}
            </p>
            <p className={styles.directions}>
                {directions}
            </p>
                {formattedNotes !== "empty" && (
                <p>
                    <strong>Notes: </strong>
                    <span dangerouslySetInnerHTML={{ __html: formattedNotes }} />
                </p>
                )}
        </div>
    );
}