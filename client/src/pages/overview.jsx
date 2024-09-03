import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { PiCalendarMinusDuotone, PiNoteDuotone, PiUserDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { disableEventUpdate, getAllEvents } from "../features/event/eventSlice";
import { ThemeContext } from "../context/ThemeContext";
import EventCalendar from "../components/dashboard/EventCalendar";

export default function BookingOverview()
{
  const { loading, events, created, updated } = useSelector((state) => state.event);
  const { feedback_fetched } = useSelector((state) => state.feedback);
  const [formatedEvents, setFormatedEvents] = useState([])
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext)

  const fetchEvents = () =>
  {
    dispatch(getAllEvents());
    dispatch(disableEventUpdate())
  }

  useEffect(() =>
  {
    if (created || updated)
    {
      fetchEvents()
    }
  }, [created, updated])

  useEffect(() =>
  {
    if (feedback_fetched)
    {
      fetchEvents()
    }
  }, [feedback_fetched])

  useEffect(() =>
  {
    if (events)
    {
      let data = [];
      events?.forEach((element) =>
      {
        let event = {
          ...element,
          start: moment(element.start_time).toDate(),
          end: moment(element.end_time).toDate()

        }
        data.push(event)
      })
      setFormatedEvents(data)
    }
  }, [events])

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="mt-8">
        <span className="bg-bg_grey text-cl_primary rounded-full h-6 text-sm font-medium px-2 py-1">
          Flow
        </span>
        <h2 className="text-xl sm:text-3xl lg:text-4xl tracking-wide mt-10 lg:mt-20">
          Fast{" "}
          <span className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} bg-clip-text`}>
            Scheduling
          </span>
        </h2>
        <section className="mt-10 lg:mt-20">
          <EventCalendar events={formatedEvents} />
        </section>
      </div>
    )
  );
}