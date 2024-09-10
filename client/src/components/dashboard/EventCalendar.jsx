import { useContext } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ThemeContext } from "../../context/ThemeContext";


const EventCalendar = ({ events }) =>
{
  const { theme } = useContext(ThemeContext);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
      </div>
      <div className="flex flex-col gap-4">
        {events?.map((event) => (
          <div
            className={`p-2 lg:p-4 ${theme == 'light' ? 'bg-bg_lightest' : 'bg-bg_primary'}`}
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
