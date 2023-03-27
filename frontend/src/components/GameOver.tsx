import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { TUser } from '../common/types';
import UserService from '../services/UserService';
import GameService from '../services/GameService';
import { GAME_PATH } from '../common/constants';

interface Props {
  isWinner: boolean;
  setIsGameOver: (isGameOver: boolean) => void;
  userId: string;
}

function GameOver({ isWinner, setIsGameOver, userId }: Props) {
  const [topPlayers, setTopPlayers] = useState<TUser[] | []>([]);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getTopPlayers().then((players) => setTopPlayers(players));
  }, []);

  const handleClick = async () => {
    const gameData = await GameService.start(userId);
    setIsGameOver(false);
    navigate(GAME_PATH, { state: gameData });
  };

  return (
    <div className={clsx('flex justify-center')}>
      <div className={clsx('flex flex-col items-center mt-48 mx-8')}>
        <p className={clsx('text-white text-xl font-bold mb-5')}>Game over</p>
        <p className={clsx('text-white text-base font-normal mb-5')}>
          {isWinner
            ? 'Congratulations you are winner!'
            : 'You loose, try again!'}
        </p>
        {topPlayers.length !== 0 ? (
          <p className={clsx('text-white text-xl font-bold mb-5')}>
            Top Players
          </p>
        ) : null}
        <div className={clsx('flex flex-col items-start mb-5')}>
          {topPlayers.map((player, index) => (
            <p
              key={player.username}
              className={clsx('text-white text-base font-normal mb-2')}
            >
              {index + 1} {player.username} score is {player.points}{' '}
            </p>
          ))}
        </div>
        <Button onClick={handleClick} className={clsx('bg-secondary800')}>
          New Game
        </Button>
      </div>
    </div>
  );
}

export default GameOver;
