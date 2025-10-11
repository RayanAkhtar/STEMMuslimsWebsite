import ical from 'node-ical';

export async function getCalendarData(iCalUrl) {
    try {
        const events = await ical.async.fromURL(iCalUrl);
        //console.log(events);
        return Object.values(events)
            .filter(event => event.type === 'VEVENT')
            .map(event => ({
                id: event.uid,
                title: event.summary,
                startDateTime: event.start.toISOString(),
                endDateTime: event.end.toISOString(),
                location: event.location || null,
                description: event.description || null
            }));
    } catch (error) {
        console.error('Error parsing iCal data:', error);
        throw new Error('Failed to parse iCal data');
    }
}