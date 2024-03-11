import img1 from '../assets/images/coding-event-1.png'
import img2 from '../assets/images/coding-event-4.png'
import img3 from '../assets/images/coding-event-5.png'

export const EVENTS = [
  {
    id: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: img1,
    isFeatured: true,
    user : {
      username: "Yonela Johannes",
      image: "",
      title: 'Admin'
    }
  },
  {
    id: 'e2',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: img2,
    isFeatured: true,
    user : {
      username: "Yonela Johannes",
      image: "",
      title: 'Admin'
    }
  },
  {
    id: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: img3,
    isFeatured: true,
    user : {
      username: "Yonela Johannes",
      image: "",
      title: 'Admin'
    }
  },
  {
    id: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: img1,
    isFeatured: true,
    user : {
      username: "Yonela Johannes",
      image: "",
      title: 'Admin'
    }
  },
  {
    id: 'e2',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: img2,
    isFeatured: true,
    user : {
      username: "Yonela Johannes",
      image: "",
      title: 'Admin'
    }
  },
  {
    id: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: img3,
    isFeatured: true,
    user : {
      username: "Yonela Johannes",
      image: "",
      title: 'Admin'
    }
  },
  {
    id: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: img1,
    isFeatured: true,
    user : {
      username: "Yonela Johannes",
      image: "",
      title: 'Admin'
    }
  },
  {
    id: 'e2',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: img2,
    isFeatured: true,
    user : {
      username: "Yonela Johannes",
      image: "",
      title: 'Admin'
    }
  },
  {
    id: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: img3,
    isFeatured: true,
    user : {
      username: "Yonela Johannes",
      image: "",
      title: 'Admin'
    }
  },
]

export function getFeaturedEvents() {
  return EVENTS.filter((event) => event.isFeatured)
}

export function getAllEvents() {
  return EVENTS
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter

  let filteredEvents = EVENTS.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}

export function getEventById(id) {
  return EVENTS.find((event) => event.id === id)
}
