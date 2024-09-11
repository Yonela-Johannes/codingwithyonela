import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableEventUpdate, getAllEvents } from "../features/event/eventSlice";
import { ThemeContext } from "../context/ThemeContext";
import EventCalendar from "../components/dashboard/EventCalendar";
import { Head } from "../shared/Head";

export default function BookingOverview() {
  const { loading, events, created, updated } = useSelector(
    (state) => state.event
  );
  const { feedback_fetched } = useSelector((state) => state.feedback);
  const [formatedEvents, setFormatedEvents] = useState([]);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const fetchEvents = () => {
    dispatch(getAllEvents());
    dispatch(disableEventUpdate());
  };

  useEffect(() => {
    if (created || updated) {
      fetchEvents();
    }
  }, [created, updated]);

  useEffect(() => {
    if (feedback_fetched) {
      fetchEvents();
    }
  }, [feedback_fetched]);

  useEffect(() => {
    if (events) {
      let data = [];
      events?.forEach((element) => {
        let event = {
          ...element,
          start: moment(element.start_time).toDate(),
          end: moment(element.end_time).toDate(),
        };
        data.push(event);
      });
      setFormatedEvents(data);
    }
  }, [events]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="space-y-4 max-w-[550px] mb-8">
      <Head title='Events' desc='Join us for upcoming events, workshops, and collaborative sessions that inspire learning and growth.' theme={theme} />
      </div>
      <EventCalendar events={formatedEvents} />
    </div>
  );
}
