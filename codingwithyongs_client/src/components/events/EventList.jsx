import EventItems from './EventItems'

function EventList({ items }) {

  return (
    <ul className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
      {items?.map((event) => (
        <EventItems
          key={event?.id}
          id={event?.id}
          title={event?.title}
          location={event?.location}
          date={event?.date}
          image={event?.image}
          user={event?.user}
        />
      ))}
    </ul>
  )
}
export default EventList
