import clsx from 'clsx';
import { ChangeEvent, MouseEventHandler } from 'react';
import Input from './Input';
import Button from './Button';

interface Props {
  albumName: string;
  fullName: string;
  error: string;
  attempts: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Game = ({
  albumName,
  fullName,
  error,
  attempts,
  onClick,
  onChange,
}: Props) => {
  return (
    <div className={clsx('flex justify-center mt-48 mx-8')}>
      <div className={clsx('flex flex-col items-center')}>
        <p className="text-white font-bold text-xl mb-5">{albumName}</p>
        <Input
          placeholder="Enter artist full name"
          onChange={onChange}
          value={fullName}
        />
        <p className={clsx('text-red-700 mb-5')}>{error}</p>
        <Button className={clsx('bg-secondary800 mb-5')} onClick={onClick}>
          Attempt
        </Button>
        <p className={clsx('text-white font-normal text-base')}>
          You have {attempts} attempts
        </p>
      </div>
    </div>
  );
};

export default Game;
