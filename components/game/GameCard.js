import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteGame } from '../../utils/data/gameData';

const GameCard = ({
  gameObj, onUpdate,
  // id, title, maker, numberOfPlayers, skillLevel, onUpdate, gamer,
}) => {
  const { user } = useAuth();

  const deleteThisGame = (gameId) => {
    if (window.confirm(`Delete ${gameObj.title}?`)) {
      deleteGame(gameId).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>By: {gameObj.maker}</Card.Header>
      <Card.Body>
        <Card.Title>{gameObj.title}</Card.Title>
        <Card.Text>{gameObj.numberOfPlayers} players needed</Card.Text>
        <Link href={`/games/${gameObj.id}`} passHref>
          <Button variant="primary">VIEW</Button>
        </Link>
        {user.id === gameObj?.gamer.id ? (
          <>
            <Link href={`/games/edit/${gameObj?.id}`} passHref>
              <Button variant="success">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={() => deleteThisGame(gameObj.id)}>
              DELETE
            </Button>
          </>
        ) : (
          ''
        )}
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {gameObj.skillLevel}</Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    numberOfPlayers: PropTypes.number,
    skillLevel: PropTypes.number,
    gamer: PropTypes.shape({
      id: PropTypes.number,
      bio: PropTypes.string,
      uid: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
