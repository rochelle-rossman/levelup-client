import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent } from '../../utils/data/eventData';

export default function EventForm({ user }) {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    game: 0,
    description: '',
    date: '',
    time: '',
    organizer: user.uid,
  });
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      game: currentEvent.game,
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: user.uid,
    };
    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" required value={currentEvent.date} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" name="time" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select onChange={handleChange} className="mb-3" name="game" value={currentEvent.game?.id} required>
            <option value="">Select a Game</option>
            {games.map((game) => (
              <option defaultValue={game.id === currentEvent.game} key={game.title} value={game.id}>
                {game.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};
