import {kv} from '@vercel/kv'
import { access } from 'fs';

interface PrayerTime {
    fajr: string;
    dhuhr: string;
    asr: string;
    magrib: string;
    isha: string;
}

const prayerTimesEndpoint = (apiKey: string, year: string, month: string) => {
    //return `https://www.londonprayertimes.com/api/times/?format=json&key=${apiKey}&year=${year}&month=${month}&24hours=true`;
    return `https://www.londonprayertimes.com/api/times/?format=json&key=${apiKey}&year=${year}&month=${month}&24hours=true`
  };

export async function fetchAndStorePrayerTimes() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    //const apiKey = process.env.API_KEY;
    const apiKey = "9fa65efc-3a14-4636-af03-98a7b51c401f";
    const response = await fetch(prayerTimesEndpoint(apiKey, year.toString(), month.toString()));
    const data = await response.json();

    const prayerTimes = Object.entries(data.times).reduce((acc: Record <string, PrayerTime>, [date, times]: [string, any]) => {
        acc[date] = {
            fajr: times.fajr,
            dhuhr: times.dhuhr,
            asr: times.asr,
            magrib: times.magrib,
            isha: times.isha,
        };
        return acc;
    }, {});    

    //await kv.set(`prayerTimes:${year}:${month}`, JSON.stringify(prayerTimes));
    return prayerTimes;

}