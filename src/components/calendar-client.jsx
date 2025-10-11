'use client';

import { useState, useEffect } from 'react';
import CalendarUI from './calendar-ui';

export default function Calendar({ initialMeetings }) {
  const [meetings, setMeetings] = useState(initialMeetings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/calendar-data');
        if (!response.ok) {
          throw new Error('Failed to fetch updated calendar data');
        }
        const data = await response.json();
        //console.log(data);
        setMeetings(data);
      } catch (error) {
        console.error('Error fetching updated calendar data:', error);
      }
    };

    // Set up an interval to fetch data every minute
    const intervalId = setInterval(fetchData, 60000); // 60 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <CalendarUI meetings={meetings} />;
}