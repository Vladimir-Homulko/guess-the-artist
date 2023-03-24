import { ReactNode, FC, MouseEventHandler } from 'react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({ children, onClick, className = '' }) => {
  return(
    <>
      <button
        className={clsx(
          'p-2 justify-center items-center text-white text-xl rounded-2xl',
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button
