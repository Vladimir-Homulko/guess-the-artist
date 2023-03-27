import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import clsx from 'clsx';
import Button from '../components/Button';
import { HOME_PATH } from '../common/constants';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(HOME_PATH);
  };

  return (
    <div className={clsx('h-screen w-full flex justify-center items-center')}>
      <div className={clsx('flex flex-col items-center')}>
        <p className={clsx('text-white text-xl font-bold mb-5')}>
          {isRouteErrorResponse(error) && error.status === 404
            ? 'Page Not Found'
            : 'Ops, something went wrong...'}
        </p>
        <Button onClick={handleClick} className={clsx('bg-secondary800')}>
          Return to home page
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
