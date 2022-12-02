import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const EventCard = ({ eventObj, onUpdate }) => {
  const { user } = useAuth();
  const deleteThisEvent = (eventId) => {
    if (window.confirm('Delete this event?')) {
      deleteEvent(eventId).then(() => onUpdate());
    }
  };

  const joinThisEvent = () => {
    joinEvent(eventObj.id, user.uid).then(() => onUpdate());
  };

  const leaveThisEvent = () => {
    leaveEvent(eventObj.id, user.uid).then(() => onUpdate());
  };

  return (
    <Card className="text-center">
      <Card.Header>{eventObj.game.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {eventObj.organizer.bio}</Card.Title>
        <Card.Text>{eventObj.description}</Card.Text>
        <Link href={`/events/${eventObj.id}`} passHref>
          <Button variant="light">VIEW</Button>
        </Link>
        {eventObj.organizer.id === user.id ? (
          <>
            <Link href={`/events/edit/${eventObj.id}`} passHref>
              <Button variant="light">EDIT</Button>
            </Link>
            <Button variant="light" onClick={() => deleteThisEvent(eventObj.id)}>
              DELETE
            </Button>
          </>
        ) : ('')}
        {eventObj.joined ? (
          <Button variant="outline-danger" onClick={() => leaveThisEvent()}>LEAVE EVENT</Button>
        ) : (
          <Button variant="outline-success" onClick={() => joinThisEvent()}>JOIN EVENT</Button>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        Date/Time: {eventObj.date} {eventObj.time}
      </Card.Footer>
    </Card>
  );
};

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      maker: PropTypes.string,
      number_of_players: PropTypes.number,
      skill_level: PropTypes.number,
    }).isRequired,
    organizer: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }).isRequired,
    id: PropTypes.number,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    joined: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
