import React, { useState } from 'react';
import classnames from 'classnames';
import Search from '@src/lib/assets/search.svg?react';

interface SearchInputUIProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disableSearchButton?: boolean;
  showBorder?: boolean;
}

function SearchInputUI({
  value,
  onChange,
  onSubmit,
  placeholder = '',
  className,
  disableSearchButton = false,
  showBorder = false,
}: SearchInputUIProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    if (disableSearchButton) {
      e.preventDefault();
      return;
    }
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div
      className={classnames([
        'group bg-white px-[30px] sm:px-[12px] rounded-[100px] border relative duration-200 h-[46px]',
        showBorder
          ? isFocus
            ? 'border-brand'
            : 'border-[#DDDDDD]'
          : isFocus
          ? 'border-brand'
          : 'border-transparent',
        className,
      ])}
    >
      <div className="flex justify-between items-center h-full">
        <input
          type="text"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={classnames([
            'text-15 bg-transparent outline-none w-full',
            isFocus && '[&::placeholder]:text-brand',
          ])}
        />

        <div
          className={`${!disableSearchButton && 'cursor-pointer'}`}
          onClick={handleSearchClick}
          onMouseDown={(e) => {
            if (disableSearchButton) {
              e.preventDefault();
            }
          }}
        >
          <Search
            className={`w-[18px] h-[18px] ${
              isFocus
                ? 'fill-brand stroke-brand'
                : 'stroke-font-sub_2'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchInputUI;
