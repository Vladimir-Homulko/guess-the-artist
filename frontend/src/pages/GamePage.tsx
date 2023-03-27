import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ContextType, TGameData } from '../common/types';
import {
  ARTIST_NAME_ERROR_MESSAGE,
  GAME_PATH,
  HOME_PATH,
} from '../common/constants';
import GameService from '../services/GameService';
import GameOver from '../components/GameOver';
import Game from '../components/Game';

const initialRoundState: TGameData = {
  attempts: 0,
  albumName: '',
  isWinner: false,
  isGameOver: false,
};

const GamePage = () => {
  const [gameData, setGameData] = useState<TGameData>(initialRoundState);
  const [userId, setUserId] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { updateUser, isGameOver, setIsGameOver } =
    useOutletContext<ContextType>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const id = localStorage.getItem('userId') as string;

    if (!id) {
      navigate(HOME_PATH);
      return;
    }

    setUserId(id);

    if (location.state) {
      const { albumName, username, points, attempts } = location.state;
      updateUser({ id, username, points });
      setGameData((prevState) => {
        return {
          ...prevState,
          albumName,
          attempts,
        };
      });
      navigate(GAME_PATH, { replace: true });
    } else {
      GameService.getRound(id).then((round) => {
        updateUser({
          id,
          username: round.username,
          points: round.points,
        });
        setGameData((prevState) => {
          return {
            ...prevState,
            attempts: round.attempts,
            albumName: round.albumName,
            isGameOver: round.isGameOver,
          };
        });
        setIsGameOver(round.isGameOver);
      });
    }
  }, [location.state, navigate, setIsGameOver, updateUser]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleClick = async () => {
    if (!fullName) {
      setError(ARTIST_NAME_ERROR_MESSAGE);
      return;
    }

    const attempt = await GameService.attempt(userId, fullName);
    setGameData({
      attempts: attempt.attempts,
      albumName: attempt.albumName,
      isWinner: attempt.isWinner,
      isGameOver: attempt.isGameOver,
    });
    updateUser({
      id: userId,
      username: attempt.username,
      points: attempt.points,
    });
    setIsGameOver(attempt.isGameOver);
    setFullName('');
  };

  if (isGameOver) {
    return (
      <GameOver
        isWinner={gameData.isWinner}
        setIsGameOver={setIsGameOver}
        userId={userId}
      />
    );
  }

  return (
    <Game
      albumName={gameData.albumName}
      fullName={fullName}
      error={error}
      attempts={gameData.attempts}
      onChange={handleChange}
      onClick={handleClick}
    />
  );
};

export default GamePage;
