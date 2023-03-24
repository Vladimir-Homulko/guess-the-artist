import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { UserService } from '../services/UserService';
import { ContextType } from '../common/types';

const GamePage = () => {
  const { updateUser } = useOutletContext<ContextType>();
  useEffect(() => {
    const id = localStorage.getItem('userId') as string;
    UserService.getById(id)
      .then(user => updateUser(user))
  }, []);

  return(
    <div>
      Game
    </div>
  )
}

export default GamePage;
