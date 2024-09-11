import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { disableEventUpdate, getAllEvents } from "../features/event/eventSlice";
import { ThemeContext } from "../context/ThemeContext";
import EventCalendar from "../components/dashboard/EventCalendar";
import { SlideUp } from "../animation/animate";

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
        <motion.h1
          variants={SlideUp(0.2)}
          initial="initial"
          whileInView="animate"
          className="text-xl lg:text-4xl font-bold"
        >
          Events
        </motion.h1>
        <motion.p
          variants={SlideUp(0.4)}
          initial="initial"
          whileInView="animate"
          className="text-gray-500 text-sm max-w-[350px]"
        >
          Bring your dream home to life with one-on-one design help & hand
          picked products
        </motion.p>
      </div>
      <EventCalendar events={formatedEvents} />
    </div>
  );
}
