import { animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useTranslator from '@hooks/useTranslator';

const stats = [
  {
    icon: '/assets/main/section2/trophy.svg',
    key: 'HOME_SECTION2_AWARDS',
    countKey: 'HOME_SECTION2_AWARDS_COUNT',
  },
  {
    icon: '/assets/main/section2/globe.svg',
    key: 'HOME_SECTION2_GLOBAL',
    countKey: 'HOME_SECTION2_GLOBAL_COUNT',
  },
  {
    icon: '/assets/main/section2/school.svg',
    key: 'HOME_SECTION2_SCHOOL',
    countKey: 'HOME_SECTION2_SCHOOL_COUNT',
  },
  {
    icon: '/assets/main/section2/teacher.svg',
    key: 'HOME_SECTION2_TEACHER',
    countKey: 'HOME_SECTION2_TEACHER_COUNT',
  },
] as const;

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    let animation: ReturnType<typeof animate> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animation = animate(0, target, {
            duration: 2,
            ease: 'easeOut',
            onUpdate: (value) => setCount(Math.round(value)),
          });
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(ref.current);

    return () => {
      animation?.stop();
      observer.disconnect();
    };
  }, [target]);

  const width = `${String(target).length + 1}ch`; // +의 너비를 위해서 +1 을 추가

  return (
    <span
      ref={ref}
      className="inline-block text-right"
      style={{ minWidth: width, fontVariantNumeric: 'tabular-nums' }}
    >
      {count}+
    </span>
  );
}

interface ISection2 {}

function Section2({}: ISection2) {
  const { t, isKorean } = useTranslator();

  return (
    <section className="h-[68px] tb:h-[164px] mb:h-[164px] tb:h-auto mb:h-auto tb:py-[20px] mb:py-[20px] bg-brand_3">
      <div className="max-w-[1200px] sd:max-w-[944px] tb:max-w-[728px] sm:max-w-[328px] h-full mx-auto tb:px-[16px] mb:px-[16px] tb:flex tb:flex-col tb:items-center mb:flex mb:flex-col mb:items-center">
        <ul className="h-full flex items-center justify-between gap-[24px] tb:flex-col mb:flex-col tb:items-start mb:items-start tb:gap-1 mb:gap-1 tb:w-fit mb:w-fit">
          {stats.map(({ icon, key, countKey }) => {
            const count = parseInt(t(countKey), 10);
            return (
              <li key={key} className="flex items-center gap-[12px]">
                <img
                  src={icon}
                  alt=""
                  className="w-[28px] h-[28px] tb:w-[20px] mb:w-[20px] tb:h-[20px] mb:h-[20px] shrink-0"
                />
                <span className="p2-b whitespace-pre tb:whitespace-nowrap mb:whitespace-nowrap">
                  <CountUp target={count} />
                  {isKorean ? ' ' : '\n'}
                  {t(key)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Section2;
