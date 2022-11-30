import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent } from '../../utils/data/eventData';

const EventCard = ({ eventObj, onUpdate }) => {
  const deleteThisEvent = (eventId) => {
    if (window.confirm('Delete this event?')) {
      deleteEvent(eventId).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{eventObj.game.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {eventObj.organizer.bio}</Card.Title>
        <Card.Text>{eventObj.description}</Card.Text>
        <Link href={`/events/${eventObj.id}`} passHref>
          <Button variant="primary">VIEW</Button>
        </Link>
        <Link href={`/events/edit/${eventObj.id}`} passHref>
          <Button variant="success">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={() => deleteThisEvent(eventObj.id)}>
          DELETE
        </Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
