import React from 'react';
import useScrollFadeIn from '@hooks/useScrollFadeIn';
import useTranslator from '@hooks/useTranslator';
import LazyImage from '@components/ui_old/image/lazy-image';

const schoolIcon = '/assets/main/section6/school.png';
const classroomIcon = '/assets/main/section6/teacher.png';
const trophyIcon = '/assets/main/section6/trophy.png';
const officeIcon = '/assets/main/section6/office.png';

const LOGO_COUNT = 27;

function getLogoSrc(index: number, isKorean: boolean): string {
  const base = isKorean ? 0 : 13;
  const num = ((base + index) % LOGO_COUNT) + 1;
  return `/assets/main/section6/logo/logo_${num}.svg`;
}

type TSolution = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

function Section6() {
  const { t, isKorean } = useTranslator();
  const animatedSection = useScrollFadeIn({});
  const logos = Array.from({ length: LOGO_COUNT }, (_, i) =>
    getLogoSrc(i, isKorean),
  );

  const SOLUTIONS: TSolution[] = [
    {
      id: 1,
      title: t('HOME_SECTION6_CARD1_TITLE'),
      description: t('HOME_SECTION6_CARD1_DESC'),
      icon: schoolIcon,
    },
    {
      id: 2,
      title: t('HOME_SECTION6_CARD2_TITLE'),
      description: t('HOME_SECTION6_CARD2_DESC'),
      icon: classroomIcon,
    },
    {
      id: 3,
      title: t('HOME_SECTION6_CARD3_TITLE'),
      description: t('HOME_SECTION6_CARD3_DESC'),
      icon: trophyIcon,
    },
    {
      id: 4,
      title: t('HOME_SECTION6_CARD4_TITLE'),
      description: t('HOME_SECTION6_CARD4_DESC'),
      icon: officeIcon,
    },
  ];

  return (
    <section
      {...animatedSection}
      className="max-w-[min(1200px,calc(100%_-_80px))] sd:max-w-[min(944px,calc(100%_-_40px))] tb:max-w-[min(728px,calc(100%_-_40px))] sm:max-w-[min(328px,calc(100%_-_40px))] mx-auto py-[140px] tb:py-[40px] mb:py-[40px] bg-white"
    >
      <div className="">
        {/* Header */}
        <div className="text-center mb-[80px] tb:mb-[40px] mb:mb-[40px]">
          <h1 className="h1-m tb:h4-m mb:h4-m whitespace-pre-wrap sd:whitespace-normal tb:whitespace-normal mb:whitespace-normal break-keep">
            {t('HOME_SECTION6_TITLE')}
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-[20px] tb:grid-cols-1 mb:grid-cols-1">
          {SOLUTIONS.map((item, idx) => (
            <SolutionCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>

      {/* Partner logos */}
      <div
        className="mt-[160px] tb:mt-[80px] mb:mt-[80px] overflow-hidden relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div
          className="flex w-max infinity-loop-left"
          style={{ animationDuration: '80s' }}
        >
          {[0, 1].map((repeat) => (
            <div key={repeat} className="flex shrink-0">
              {logos.map((src, i) => (
                <div
                  key={`partner-${repeat}-${i}`}
                  className="h-[60px] tb:h-[30px] sm:h-[30px] mx-[14px] tb:mx-[7px] sm:mx-[7px] flex-shrink-0 flex items-center"
                >
                  <img
                    className="h-full w-auto object-contain"
                    src={src}
                    alt={`partner-${i}`}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({ item, index }: { item: TSolution; index: number }) {
  const animated = useScrollFadeIn({ delay: 0.1 * index });

  return (
    <div
      {...animated}
      className="rounded-[24px] p-[40px] flex items-center gap-[40px] tb:p-[24px] mb:p-[24px] tb:gap-[20px] mb:gap-[20px]"
      style={{ background: '#1B385205', outline: '1px solid #1B38521A' }}
    >
      <div className="w-[80px] h-[80px] tb:w-[40px] mb:w-[40px] tb:h-[40px] mb:h-[40px] flex-shrink-0 flex items-center justify-center">
        <LazyImage
          src={item.icon}
          alt={item.title}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <div className="flex flex-col gap-[12px] tb:gap-[4px] mb:gap-[4px]">
        <h2 className="p1-b">{item.title}</h2>
        <p className="p4-r whitespace-pre-wrap sd:whitespace-normal tb:whitespace-normal mb:whitespace-normal break-keep">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default Section6;
