interface PrayerTime {
    fajr: string;
    dhuhr: string;
    asr: string;
    magrib: string;
    isha: string;
}

const prayerTimesEndpoint = (apiKey: string, year: string, month: string) => {
    return `https://www.londonprayertimes.com/api/times/?format=json&key=${apiKey}&year=${year}&month=${month}&24hours=true`
  };

export async function fetchAndStorePrayerTimes() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const apiKey = process.env.PRAYER_TIMES_API_KEY;
    if (!apiKey) {
        throw new Error("Environment variable PRAYER_TIMES_API_KEY is not defined.");
    }
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

    return prayerTimes;

}