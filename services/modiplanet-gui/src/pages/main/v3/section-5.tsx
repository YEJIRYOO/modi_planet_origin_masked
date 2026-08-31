import React from 'react';
import useScrollFadeIn from '@hooks/useScrollFadeIn';
import useTranslator from '@hooks/useTranslator';
import LazyImage from '@components/ui_old/image/lazy-image';

type TCurriculumCard = {
  id: number;
  level: string;
  chipBg: string;
  chipStyle: React.CSSProperties | undefined;
  cardBg: string;
  cardStyle: React.CSSProperties | undefined;
  description: string;
  image: string;
  tags: string;
};

const keepWordsTogether = (text: string) => text.replace(/ /g, '\u00A0');

function Section5() {
  const { t } = useTranslator();
  const animatedSection = useScrollFadeIn({});

  const CURRICULUM_CARDS: TCurriculumCard[] = [
    {
      id: 1,
      level: t('HOME_SECTION5_CARD1_BADGE'),
      chipBg: 'bg-[#FFEDBD]',
      chipStyle: undefined,
      cardBg: 'bg-[#FFFAEF]',
      cardStyle: undefined,
      description: t('HOME_SECTION5_CARD1_TITLE'),
      image: '/assets/main/section5/basic.svg',
      tags: [
        t('HOME_SECTION5_CARD1_DESC1'),
        t('HOME_SECTION5_CARD1_DESC2'),
        t('HOME_SECTION5_CARD1_DESC3'),
      ]
        .map(keepWordsTogether)
        .join(' ·\u00A0'),
    },
    {
      id: 2,
      level: t('HOME_SECTION5_CARD2_BADGE'),
      chipBg: 'bg-[#C3F9EB]',
      chipStyle: undefined,
      cardBg: 'bg-[#EBFFF8]',
      cardStyle: undefined,
      description: t('HOME_SECTION5_CARD2_TITLE'),
      image: '/assets/main/section5/intermediate.svg',
      tags: [
        t('HOME_SECTION5_CARD2_DESC1'),
        t('HOME_SECTION5_CARD2_DESC2'),
        t('HOME_SECTION5_CARD2_DESC3'),
      ]
        .map(keepWordsTogether)
        .join(' ·\u00A0'),
    },
    {
      id: 3,
      level: t('HOME_SECTION5_CARD3_BADGE'),
      chipBg: 'bg-brand_2',
      chipStyle: undefined,
      cardBg: 'bg-[#FFF2F2]',
      cardStyle: undefined,
      description: t('HOME_SECTION5_CARD3_TITLE'),
      image: '/assets/main/section5/advanced.svg',
      tags: [t('HOME_SECTION5_CARD3_DESC1'), t('HOME_SECTION5_CARD3_DESC2')]
        .map(keepWordsTogether)
        .join(' ·\u00A0'),
    },
    {
      id: 4,
      level: t('HOME_SECTION5_CARD4_BADGE'),
      chipBg: '',
      chipStyle: { background: '#FFFFFF80' },
      cardBg: '',
      cardStyle: {
        background: 'linear-gradient(103.85deg, #FFDBE2 0%, #F2D0FF 101.97%)',
      },
      description: t('HOME_SECTION5_CARD4_TITLE'),
      image: '/assets/main/section5/ai.svg',
      tags: [t('HOME_SECTION5_CARD4_DESC1'), t('HOME_SECTION5_CARD4_DESC2')]
        .map(keepWordsTogether)
        .join(' ·\u00A0'),
    },
  ];

  return (
    <section
      {...animatedSection}
      className="max-w-[min(1200px,calc(100%_-_80px))] sd:max-w-[min(944px,calc(100%_-_40px))] tb:max-w-[min(728px,calc(100%_-_40px))] sm:max-w-[min(328px,calc(100%_-_40px))] mx-auto py-[160px] tb:py-[80px] mb:py-[80px] bg-white"
    >
      <div className="max-w-[min(1200px,calc(100%_-_80px))] mx-auto">
        {/* Header */}
        <div className="text-center mb-[80px] tb:mb-[48px] mb:mb-[48px]">
          <h1 className="h1-m tb:h4-m mb:h4-m break-keep mb-[40px]">
            {t('HOME_SECTION5_TITLE')}
          </h1>
          <p className="p1-r tb:p2-r mb:p2-r">{t('HOME_SECTION5_DESC')}</p>
        </div>
      </div>

      <div>
        {/* Cards Grid */}
        <div className="grid grid-cols-4 gap-[20px] sd:grid-cols-2 tb:grid-cols-1 mb:grid-cols-1 tb:gap-[14px] mb:gap-[14px]">
          {CURRICULUM_CARDS.map((card, idx) => (
            <CurriculumCard key={card.id} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumCard({
  card,
  index,
}: {
  card: TCurriculumCard;
  index: number;
}) {
  const animated = useScrollFadeIn({ delay: 0.1 * index });

  return (
    <div
      {...animated}
      className={`${card.cardBg} rounded-[24px] py-[40px] tb:py-[20px] mb:py-[20px] px-[12px] tb:px-[20px] mb:px-[20px] flex flex-col items-center text-center gap-[20px] tb:gap-[12px] mb:gap-[12px]`}
      style={card.cardStyle}
    >
      {/* Chip */}
      <span
        className={`${card.chipBg} px-[20px] py-[8px] rounded-[8px] p2-b h-[40px] tb:h-[38px] mb:h-[38px] flex items-center`}
        style={card.chipStyle}
      >
        {card.level}
      </span>

      {/* Description */}
      <p className="p4-r whitespace-pre-wrap sd:whitespace-normal tb:whitespace-normal mb:whitespace-normal break-keep">
        {card.description}
      </p>

      {/* Illustration */}
      <div className="w-[80px] h-[80px] tb:w-[40px] mb:w-[40px] tb:h-[40px] mb:h-[40px] flex items-center justify-center">
        <LazyImage
          src={card.image}
          alt={card.level}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Tags */}
      <div
        className="w-[256px] px-3 py-2 sd:w-full tb:w-full mb:w-full h-[56px] tb:h-[31px] mb:h-[31px] rounded-full flex items-center justify-center"
        style={{ background: '#FFFFFFCC' }}
      >
        <p className="p6-m text-font-sub">{card.tags}</p>
      </div>
    </div>
  );
}

export default Section5;
