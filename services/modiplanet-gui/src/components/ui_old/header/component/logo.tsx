import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface ILogo {
  className?: string;
}

export function Logo({ className }: ILogo) {
  return (
    <div
      className={classNames(
        'mr-[40px] sd:mr-[24px] shrink-0 tb:w-[125px] tb:m-0-auto mb:w-[125px] mb:m-0-auto',
        className,
      )}
    >
      <Link to="/">
        <img className="w-[168px]" src="/assets/logo.svg" alt="logo" />
      </Link>
    </div>
  );
}

export default Logo;
