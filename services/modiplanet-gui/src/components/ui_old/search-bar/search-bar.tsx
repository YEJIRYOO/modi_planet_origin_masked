import React, { useState } from 'react';
import classnames from 'classnames';
import Search from '@src/lib/assets/search.svg?react';
import useTranslator from '@hooks/useTranslator';

interface ISearchBar {
  onSubmit: (value: string) => void;
  className?: string;
}

export function SearchBar({ onSubmit, className }: ISearchBar) {
  const { t } = useTranslator();
  const [value, setValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const onKeyDown = ({ keyCode }: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyCode === 13) {
      onSubmit(value);
    }
  };
  const onClick = () => {
    onSubmit(value);
  };

  return (
    <div
      className={classnames([
        'group bg-white px-[30px] py-[20px] rounded-[100px] border relative hover:border-brand duration-200',
        isFocus ? 'border-brand' : 'border-transparent',
        className,
      ])}
    >
      <div className="flex justify-between items-center">
        <input
          type="text"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChange}
          placeholder={t('ENTER_SEARCH_THING')}
          className={classnames([
            'text-15 bg-transparent outline-none w-full group-hover:[&::placeholder]:text-brand',
            isFocus && '[&::placeholder]:text-brand',
          ])}
          onKeyDown={onKeyDown}
        />

        <div
          role="button"
          className="w-[18px] h-[17px] sm:w-[14px] sm:h-[14px]"
          onClick={onClick}
        >
          <Search
            className={classnames([
              'stroke-font-sub_2 group-hover:fill-brand group-hover:stroke-brand',
              isFocus && 'fill-brand stroke-brand',
            ])}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
