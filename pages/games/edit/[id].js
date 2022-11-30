import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleGame } from '../../../utils/data/gameData';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setEditGame);
    // console.warn(editGame);
  }, [id]);

  return (
    <GameForm user={user} obj={editGame} />
  );
}
