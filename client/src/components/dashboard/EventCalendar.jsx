import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import moment from "moment/moment";


const EventCalendar = ({ events }) =>
{
  const { theme } = useContext(ThemeContext);
  return (
    <div className="max-w-6xl">
      <div className="flex flex-col gap-4">
        {events?.length ? events?.map((event) => (
          <div
            className={`p-2 lg:p-4 ${theme == 'light' ? 'bg-bg_lightest' : 'bg-bg_core'}  border border-cl_primary shadow-cl_primary shadow-md space-y-4 text-center w-full mx-auto mb-8 px-5 cursor-pointer hover:bg-bg_lighter`}
            key={event.id}
          >
            <div className="block lg:flex items-center justify-between">
              <h1 className="font-semibold">{event?.title}</h1>
              <span className="text-xs">{moment(event?.start).format('DD-MM-YYYY')} - {moment(event?.end).format('DD-MM-YYYY')}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm max-w-4xl">{event?.description}</p>
          </div>
        )).slice(0, 5) : ""}
      </div>
    </div>
  );
};

export default EventCalendar;
