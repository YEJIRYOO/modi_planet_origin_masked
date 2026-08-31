import React from 'react';
import useScrollFadeIn from '@hooks/useScrollFadeIn';
import useTranslator from '@hooks/useTranslator';

interface ISection3 {}

const cardIcons = [
  '/assets/main/section3/sad.svg',
  '/assets/main/section3/fearful.svg',
  '/assets/main/section3/weary.svg',
] as const;

const cardKeys = [
  'HOME_SECTION3_PROBLEM1',
  'HOME_SECTION3_PROBLEM2',
  'HOME_SECTION3_PROBLEM3',
] as const;

function Section3({}: ISection3) {
  const { t } = useTranslator();
  const animatedItem = useScrollFadeIn({});

  const cards = cardKeys.map((key, i) => ({
    icon: cardIcons[i],
    label: t(key),
  }));

  return (
    <section className="bg-[#F7FBFF] py-[140px] tb:py-[40px] mb:py-[40px]">
      <div
        {...animatedItem}
        className="max-w-[1200px] sd:max-w-[944px] tb:max-w-[728px] sm:max-w-[328px] mx-auto"
      >
        <div className="mb-[80px] tb:mb-[40px] mb:mb-[40px]">
          <h1 className="h1-m text-center tb:h3-b mb:h3-b whitespace-pre-wrap sd:whitespace-normal tb:whitespace-normal mb:whitespace-normal break-words">
            {t('HOME_SECTION3_TITLE')}
          </h1>
        </div>

        <ul className="flex justify-center gap-[24px] tb:flex-col mb:flex-col tb:items-center mb:items-center tb:gap-[40px] mb:gap-[40px]">
          {cards.map((card, idx) => (
            <li
              key={idx}
              className="relative border-[#EBF3FB] bg-white rounded-[24px] px-[24px] pt-[64px] pb-[48px] w-full max-w-[384px] tb:max-w-full mb:max-w-full text-center shadow-[0_12px_40px_rgba(0,0,0,0.04)] tb:pt-[56px] mb:pt-[56px] tb:pb-[40px] mb:pb-[40px] border border-gray-100"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] tb:w-[60px] tb:h-[60px] mb:w-[60px] mb:h-[60px]">
                <img
                  src={card.icon}
                  alt=""
                  className="w-full h-full drop-shadow-sm animate-wiggle"
                />
              </div>
              <p className="p2-m whitespace-pre-wrap sd:whitespace-normal tb:whitespace-normal mb:whitespace-normal break-all">
                {card.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Section3;
