import { ReactNode, MouseEventHandler } from 'react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, onClick, className = '' }: Props) {
  return (
    <button
      className={clsx(
        'p-2 justify-center items-center text-white text-xl rounded-2xl',
        className,
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
