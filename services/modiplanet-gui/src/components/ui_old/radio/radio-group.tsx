import React from 'react';
import { createContext } from 'react';
interface IRadioGroup extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export const RadioContext = createContext<
  Partial<React.InputHTMLAttributes<HTMLInputElement>>
>({});

export function RadioGroup({
  label,
  children,
  className,
  ...rest
}: IRadioGroup) {
  return (
    <fieldset className={`-mx-[5px] flex items-center ${className}`}>
      <legend>{label}</legend>
      <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
    </fieldset>
  );
}

export default RadioGroup;
