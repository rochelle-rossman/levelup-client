import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';

export default function EventForm({ user, obj }) {
  const initialState = {
    game: 0,
    description: '',
    date: '',
    time: '',
    organizer: user.uid,
  };
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
    if (obj.id) {
      setCurrentEvent({
        game: obj.game,
        description: obj.description,
        date: obj.date,
        time: obj.time,
      });
    }
  }, [obj]);

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
    if (obj.id) {
      updateEvent(event, obj.id).then(() => router.push('/events'));
    } else {
      createEvent(event).then(() => router.push('/events'));
    }
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
  obj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      maker: PropTypes.string,
      number_of_players: PropTypes.number,
      skill_level: PropTypes.number,
      game_type: PropTypes.number,
      gamer: PropTypes.number,
    }),
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  obj: PropTypes.shape({
    id: '',
    game: '',
    description: '',
    date: '',
    time: '',
  }),
};
