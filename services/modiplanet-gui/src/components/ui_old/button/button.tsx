import React, { HTMLProps, ReactNode } from 'react';
import classnames from 'classnames';

type TButtonColor = 'primary' | 'primary-line' | 'dark' | 'dark-line';

interface IButton extends HTMLProps<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  color?: TButtonColor;
  isMini?: boolean;
  isRound?: boolean;
}

export function Button({
  type,
  className,
  children,
  isMini = false,
  color = 'primary',
  isRound = false,
  ...props
}: IButton) {
  // function rippleEffect(event) {
  //   const btn = event.currentTarget;
  //
  //   const circle = document.createElement('span');
  //   const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  //   const radius = diameter / 2;
  //
  //   circle.style.width = circle.style.height = `${diameter}px`;
  //   circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
  //   circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
  //   circle.classList.add('ripple');
  //
  //   const ripple = btn.getElementsByClassName('ripple')[0];
  //
  //   if (ripple) {
  //     ripple.remove();
  //   }
  //
  //   btn.appendChild(circle);
  // }
  //
  // const handleOnClick = (event) => {
  //   rippleEffect(event);
  //   props.onClick && props.onClick(event);
  // };

  const getClassNamesByColor = (color: TButtonColor) => {
    switch (color) {
      case 'primary':
      default:
        return 'bg-brand border-brand text-white hover:bg-brand_dark active:text-white/50 [&:disabled]:bg-form-disable [&:disabled]:text-white';
      case 'primary-line':
        return 'bg-white border-brand text-brand active:text-brand_dark active:border-brand_dark [&:disabled]:bg-white [&:disabled]:text-form-disable';
      case 'dark':
        return 'bg-font-main border-font-main text-white hover:bg-black active:text-white/50 [&:disabled]:bg-form-disable [&:disabled]:text-white';
      case 'dark-line':
        return 'bg-white border-font-main text-font-main hover:bg-font-main/10 active:bg-black/10 active:text-black [&:disabled]:bg-white [&:disabled]:text-form-disable';
    }
  };

  return (
    <button
      type="button"
      className={classnames([
        getClassNamesByColor(color),

        // 공통 속성
        'flex-center break-keep border duration-200 group relative overflow-hidden',
        '[&:disabled]:cursor-default',
        '[&:disabled]:border-form-disable',

        // 라운드 처리
        `${isRound ? 'rounded-full' : 'rounded-10'}`,

        // 일반, 미니 버튼 사이즈
        { 'h-[60px] sm:h-[46px] p3-b': !isMini },
        { 'h-[46px] sm:h-[34px] p5-sb': isMini },
        className,
      ])}
      {...props}
      // onClick={handleOnClick}
    >
      {children}
    </button>
  );
}

export default Button;
