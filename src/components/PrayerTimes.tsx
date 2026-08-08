"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import styles from '../styles/prayerTimes.module.scss';

interface PrayerTime {
    fajr: string;
    dhuhr: string;
    asr: string;
    magrib: string;
    isha: string;
    date: string;
}

/* NOTE: this is a client component, so any key placed here ships to the
   browser regardless of how it is stored. NEXT_PUBLIC_ keeps it out of the
   repo, but if this component is ever revived, the fetch should move behind
   a server route so the key stays server-side (see /api/update-prayer-times
   and lib/prayerTimes.ts). */
const API_KEY = process.env.NEXT_PUBLIC_PRAYER_TIMES_API_KEY ?? "";
const PRAYER_TIMES_ENDPOINT = `https://www.londonprayertimes.com/api/times/?format=json&key=${API_KEY}&24hours=true`;

const CACHE_KEY = 'prayerTimesCache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface PrayerTimesProps {
    onLoadingChange?: (isLoading: boolean) => void;
}

export function PrayerTimes({ onLoadingChange }: PrayerTimesProps) {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            setIsLoading(true);
            onLoadingChange?.(true);

            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setPrayerTimes(data);
                    setIsLoading(false);
                    onLoadingChange?.(false);
                    return;
                }
            }

            try {
                const response = await fetch(PRAYER_TIMES_ENDPOINT);
                const data = await response.json();
                if (data.city) {
                    const newPrayerTimes: PrayerTime = {
                        fajr: data.fajr,
                        dhuhr: data.dhuhr,
                        asr: data.asr,
                        magrib: data.magrib,
                        isha: data.isha,
                        date: data.date,
                    };
                    setPrayerTimes(newPrayerTimes);
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        data: newPrayerTimes,
                        timestamp: Date.now()
                    }));
                }
            } catch (error) {
                console.error('Error fetching prayer times', error);
            } finally {
                setIsLoading(false);
                onLoadingChange?.(false);
            }
        };

        fetchPrayerTimes();
    }, [onLoadingChange]);

    if (isLoading) return <div className={styles.loading}>Loading...</div>;

    if (!prayerTimes) return <div className={styles.error}>Failed to load prayer times</div>;

    const prayerTimeEntries: [string, string][] = [
        ['Fajr', prayerTimes.fajr],
        ['Dhuhr', prayerTimes.dhuhr],
        ['Asr', prayerTimes.asr],
        ['Maghrib', prayerTimes.magrib],
        ['Isha', prayerTimes.isha],
    ];

    return (
        <div className={styles.prayerTimesContainer}>
            <div className={styles.times}>
                {prayerTimeEntries.map(([name, time], index) => (
                    <div key={name} className={styles.time}>
                        <h1>{name}</h1>
                        <p>{time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}