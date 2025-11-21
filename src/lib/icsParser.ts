import { parse } from 'ical';

export interface Event {
    summary: string;
    start: string;
    end: string;
    description: string;
}

export function parseICS(icsData: string): Event[] {
    const parsedData = parse(icsData);
    const events: Event[] = [];

    for (const key in parsedData) {
        const component = parsedData[key];
        if (component.type === 'VEVENT') {
            events.push({
                summary: component.summary || 'No Title',
                start: component.start || '',
                end: component.end || '',
                description: component.description || 'No Description',
            });
        }
    }

    return events;
}