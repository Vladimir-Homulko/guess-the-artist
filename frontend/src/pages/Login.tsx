import clsx from 'clsx';
import Input from '../components/Input';
import Button from '../components/Button';
import { ChangeEvent, FC, useState } from 'react';
import { UserService } from '../services/UserService';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ContextType } from '../common/types';

const Login: FC = () => {
  const [username, setUsername] = useState<string>('');
  const { updateUser } = useOutletContext<ContextType>();
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleClick = async () => {
    if (!username) {
      // TODO: throw error
      return;
    }
    const user = await UserService.startGame(username);
    updateUser(user);
    localStorage.setItem('userId', user.id);
    navigate('/game');
  }

  return(
    <div className={clsx('flex justify-center mt-48 mx-8')}>
      <div className={clsx('flex flex-col items-center')}>
        <h1 className={clsx('text-white font-bold text-4xl mb-5')}>
          Welcome!
        </h1>
        <p className={clsx('text-white font-normal text-lg mb-5')}>
          Each round you will be shown a random album
          of the artist your task is to guess the
          full name of the artist.
        </p>
        <Input
          placeholder={'Enter username'}
          className={'mb-5'}
          onChange={handleChange}
          value={username}
        />
        <Button
          className={'bg-secondary800'}
          onClick={handleClick}
        >
          Start game
        </Button>
      </div>
    </div>
  )
}

export default Login
