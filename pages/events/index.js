import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/events/EventCard';
import { useAuth } from '../../utils/context/authContext';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getTheEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  useEffect(() => {
    getEvents(user.uid).then((data) => setEvents(data));
  }, [user.uid]);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        variant="outline-dark"
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard eventObj={event} onUpdate={getTheEvents} />
        </section>
      ))}
    </article>
  );
}

export default Home;
