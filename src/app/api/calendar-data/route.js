import { NextResponse } from 'next/server';
import { getCalendarData } from '@/lib/calendar-retrieval';
import { ical } from '@/lib/globalVariables';

export async function GET() {
  const iCalUrl = ical;

  if (!iCalUrl) {
    console.error('iCal URL is not defined');
    return NextResponse.json(
      { error: 'iCal URL is not configured' },
      { status: 500 }
    );
  }


  try {
    const meetings = await getCalendarData(iCalUrl);
    return NextResponse.json(meetings, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate'
      }
    });
  } catch (error) {
    console.error('Error fetching calendar data:', error);

    return NextResponse.json(
      { error: 'Failed to fetch calendar data' },
      { status: 500 }
    );
  }
}