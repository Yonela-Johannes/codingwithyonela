import Header from "../components/blog/Header";
import EventList from "./events/EventList";
import { EVENTS } from "../assets/dummy-data";

const Events = () => {
    const statusses = ['Interested', 'Going', 'Went']
  return (
    <div className="flex flex-col gap-8 my-8">
    <Header statusses={statusses} />
    <div className="flex flex-col h-full overflow-y-hidden">
        <EventList items={EVENTS} />
    </div>
    </div>
  );
};

export default Events;
