import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleGame } from '../../utils/data/gameData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setGameDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <h3>{gameDetails?.title}</h3>
        <h4>{gameDetails?.game_type?.label}</h4>
        <h6>{gameDetails?.maker}</h6>
        <hr />
        <p>
          <b>Number Of Players:</b> {gameDetails?.number_of_players} <b>Skill Level:</b> {gameDetails?.skill_level}
        </p>
      </div>
    </div>
  );
}
