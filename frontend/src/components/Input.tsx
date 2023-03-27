import clsx from 'clsx';
import { ChangeEvent, FC } from 'react';

interface Props {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
}

const Input: FC<Props> = ({ placeholder, onChange, value, className = '' }) => {
  return (
    <input
      type="text"
      className={clsx(
        'p-4 bg-tertiary text-white text-xl font-normal placeholder:#DE84FB',
        'rounded-2xl outline-0 text-center',
        className,
      )}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
