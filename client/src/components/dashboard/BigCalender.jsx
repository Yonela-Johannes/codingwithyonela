import { Calendar, momentLocalizer, globalizeLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  disableEventUpdate,
  getAllEvents,
} from "../../features/event/eventSlice";
import Loader from "../../shared/Loader";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiTwotoneRightCircle } from "react-icons/ai";
import globalize from 'globalize'
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const localizer = globalizeLocalizer(globalize)

const BigCalendar = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state.user)
  const { loading, events, created, updated } = useSelector(
    (state) => state.event
  );
  const [view, setView] = useState(Views.WORK_WEEK);
  const [formatedEvents, setFormatedEvents] = useState([]);
  const dispatch = useDispatch();

  const handleOnChangeView = (selectedView) => {
    setView(selectedView);
  };

  const fetchEvents = () => {
    dispatch(getAllEvents());
    dispatch(disableEventUpdate());
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (created || updated) {
      fetchEvents();
    }
  }, [created, updated]);

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

  console.log(formatedEvents)
  return loading ? (
    <Loader />
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col"
    >
      {currentUser?.isAdmin || currentUser?.is_staff ? (
      <Link className={`${theme == 'light' ? 'text-primary' : 'text-bg_lightest'} flex w-full justify-end`} to={`/admin/new-event`}>
        <button className="flex items-center justify-center mb-2 lg:mb-4 self-end">
          New Event
        </button>
      </Link>

      ) : ""}
      <Calendar
        localizer={localizer}
        events={formatedEvents}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "week", "day"]}
        view={view}
        style={{ height: "100%" }}
        onView={handleOnChangeView}
        min={new Date(2024, 1, 0, 6, 0, 0)}
        max={new Date(2030, 1, 0, 18, 0, 0)}
      />
    </motion.div>
  );
};

export default BigCalendar;
