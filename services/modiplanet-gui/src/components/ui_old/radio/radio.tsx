import React, { Fragment, useContext } from 'react';
import { RadioContext } from './radio-group';

interface IRadio {
  children: React.ReactNode;
  value: any;
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export function Radio({
  children,
  value,
  name,
  defaultChecked,
  disabled,
}: IRadio) {
  const group = useContext(RadioContext);
  return (
    <label
      role="button"
      className={`mx-[5px] p-[14px_16px] h-[46px] border rounded-10 flex-center p5-sb duration-200 ${
        group.value === value
          ? 'border-[#2B2929] bg-[#2B2929] text-white'
          : 'border-[#2B2929] text-[#2B2929]'
      }`}
    >
      <input
        className="hidden"
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled || group.disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={(e) =>
          group.onChange && group.onChange(e.target.value as any)
        }
      />
      {children}
    </label>
  );
}

export default Radio;
