import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import Logo from '/logo.svg';
import Button from './Button';
import { TUser } from '../common/types';
import GameService from '../services/GameService';
import { HOME_PATH } from '../common/constants';

interface Props {
  user: TUser | null;
  updateUser: (user: TUser | null) => void;
}

const Header = ({ user, updateUser }: Props) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (user) {
      await GameService.finish(user.id);
      localStorage.removeItem('userId');
      updateUser(null);
      navigate(HOME_PATH);
    }
  };

  return (
    <header
      className={clsx(
        'flex justify-between items-center bg-tertiary p-5 rounded-b-lg',
      )}
    >
      <img src={Logo} alt="Logo" className={clsx('w-11 h-11')} />
      {user?.username ? (
        <p className="text-xl text-white font-normal">
          {user.username}, your score {user.points}
        </p>
      ) : null}
      {user?.username ? (
        <Button
          className={clsx('bg-tertiary500 hover:bg-secondary800')}
          onClick={handleClick}
        >
          Exit
        </Button>
      ) : null}
    </header>
  );
};

export default Header;
