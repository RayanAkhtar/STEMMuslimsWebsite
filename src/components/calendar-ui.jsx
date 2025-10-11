"use client";

import './whats-on.css';
import { DotsVerticalIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parseISO, startOfToday, startOfMonth } from 'date-fns';
import { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
} 

export default function CalendarUI({ meetings }) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(today);
  //console.log("Today: " + today);
  let firstDayCurrentMonth = startOfMonth(currentMonth);
  //console.log("First day of current month 1: " + firstDayCurrentMonth);


  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(firstDayNextMonth);
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(firstDayNextMonth);
  }

  // Ensure meetings are properly formatted and check for undefined values
  let selectedDayMeetings = meetings
    .filter(meeting => {
      if (!meeting.startDateTime) {
        console.error('Invalid meeting startDateTime:', meeting);
        return false;
      }
      try {
        // Convert the startDatTime string to a Date object
        const startDate = meeting.startDateTime instanceof Date ? meeting.startDateTime : new Date(meeting.startDateTime);
        return isSameDay(startDate, selectedDay);
      } catch (error) {
        console.error('Error parsing meeting startDateTime:', meeting, error);
        return false;
      }
    });

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-[#917849]',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {meetings.some(meeting =>
                      isSameDay(meeting.startDateTime, day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map(meeting => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p>No events for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function Meeting({ meeting }) {
  if (!meeting.startDateTime || !meeting.endDateTime) {
    console.error('Invalid meeting times:', meeting);
    return null;
  }

  let startDateTime = meeting.startDateTime instanceof Date ? meeting.startDateTime : new Date(meeting.startDateTime);

  let endDateTime = meeting.endDateTime instanceof Date ? meeting.endDateTime : new Date(meeting.endDateTime);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.title}</p>
        <p className="mt-0.5">
          <time dateTime={startDateTime.toISOString()}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={endDateTime.toISOString()}>
            {format(endDateTime, 'h:mm a')}
          </time>
        </p>
        {location(meeting)}
      </div>
    </li>
  );
}

function location (meeting) {
  if (meeting.location) {
    return (
      <p className="mt-0.5 text-gray-500">Location: {meeting.location}</p>
    );
  }
}

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];
