import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleEvent } from '../../utils/data/eventData';

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEventDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <h3>{eventDetails?.game?.title }</h3>
        <h5>
          {eventDetails?.date}
        </h5>
        <hr />
        <h5>{eventDetails?.time }</h5>
        <p>{eventDetails?.description}</p>
      </div>
    </div>
  );
}
