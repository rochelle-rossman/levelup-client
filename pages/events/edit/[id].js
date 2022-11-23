import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EventForm from '../../../components/events/EventForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleEvent } from '../../../utils/data/eventData';

export default function EditEvent() {
  const [editEvent, setEditEvent] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEditEvent);
  }, [id]);

  return (
    <EventForm user={user} obj={editEvent} />
  );
}
