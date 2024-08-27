import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableEventUpdate, getAllEvents } from "../../features/event/eventSlice";
import Loader from "../../shared/Loader";

const localizer = momentLocalizer(moment);

const BigCalendar = () =>
{
  const { loading, events, created, updated } = useSelector((state) => state.event);
  const [view, setView] = useState(Views.WORK_WEEK);
  const [formatedEvents, setFormatedEvents] = useState([])
  const dispatch = useDispatch();

  const handleOnChangeView = (selectedView) =>
  {
    setView(selectedView);
  };

  const fetchEvents = () =>
  {
    dispatch(getAllEvents());
    dispatch(disableEventUpdate())
  }

  useEffect(() =>
  {
    fetchEvents()
  }, []);

  useEffect(() =>
  {
    if (created || updated)
    {
      fetchEvents()
    }
  }, [created, updated])

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
    ) :
      (
        <Calendar
          localizer={localizer}
          events={formatedEvents}
          startAccessor="start"
          endAccessor="end"
          views={["work_week", "week", "day"]}
          view={view}
          style={{ height: "98%" }}
          onView={handleOnChangeView}
          min={new Date(2024, 1, 0, 6, 0, 0)}
          max={new Date(2030, 1, 0, 18, 0, 0)}
        />
      )
  );
};

export default BigCalendar;
