import clsx from 'clsx';
import { ChangeEvent, FC, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import UserService from '../services/UserService';
import { ContextType } from '../common/types';
import { GAME_PATH, USERNAME_ERROR_MESSAGE } from '../common/constants';
import GameService from '../services/GameService';

const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { updateUser } = useOutletContext<ContextType>();
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleClick = async () => {
    if (!username) {
      setError(USERNAME_ERROR_MESSAGE);
      return;
    }
    const user = await UserService.createUser(username);
    updateUser(user);
    localStorage.setItem('userId', user.id);
    const gameData = await GameService.start(user.id);
    navigate(GAME_PATH, { state: gameData });
  };

  return (
    <div className={clsx('flex justify-center mt-48 mx-8')}>
      <div className={clsx('flex flex-col items-center')}>
        <h1 className={clsx('text-white font-bold text-4xl mb-5')}>Welcome!</h1>
        <p className={clsx('text-white font-normal text-lg mb-5')}>
          Each round you will be shown a random album of the artist your task is
          to guess the full name of the artist.
        </p>
        <Input
          placeholder="Enter username"
          onChange={handleChange}
          value={username}
        />
        <p className="text-red-700 mb-5">{error}</p>
        <Button className="bg-secondary800" onClick={handleClick}>
          Start game
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
