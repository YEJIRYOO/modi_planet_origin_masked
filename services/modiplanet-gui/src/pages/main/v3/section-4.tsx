import useTranslator from '@hooks/useTranslator';
import useScrollFadeIn from '@hooks/useScrollFadeIn';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import useLinkValidation from '@hooks/useLinkValidation';
import LazyImage from '@components/ui_old/image/lazy-image';
import { FORM_LINKS } from '@src/pages/main/v3/constants';
import OnlyPCWarningModal from '@components/ui/common/Modal/OnlyPCWarningModal';

function Section4() {
  const { t, isKorean } = useTranslator();
  const animatedSection = useScrollFadeIn({});
  const { onClickCodeEditor, onClickLearningSpace, warningModalProps } =
    useLinkValidation();

  const onClickConsultation = () => {
    window.open(
      isKorean ? FORM_LINKS.CLASS_INQUIRY.ko : FORM_LINKS.CLASS_INQUIRY.global,
      '_blank',
    );
  };

  const CARDS = [
    {
      id: 1,
      badge: t('HOME_SECTION4_CONTENT1_BADGE'),
      chipColor: 'red' as const,
      title: t('HOME_SECTION4_CONTENT1_TITLE'),
      subtitle: t('HOME_SECTION4_CONTENT1_DESC'),
      features: [
        t('HOME_SECTION4_CONTENT1_BP1'),
        t('HOME_SECTION4_CONTENT1_BP2'),
        t('HOME_SECTION4_CONTENT1_BP3'),
      ],
      buttonText: t('HOME_SECTION4_CONTENT1_CTA'),
      image: '/assets/main/section4/image_01.png',
      reverse: false,
      onClick: () => onClickCodeEditor(),
    },
    {
      id: 2,
      badge: t('HOME_SECTION4_CONTENT2_BADGE'),
      chipColor: 'red' as const,
      isNew: true,
      title: t('HOME_SECTION4_CONTENT2_TITLE'),
      subtitle: t('HOME_SECTION4_CONTENT2_DESC'),
      features: [
        t('HOME_SECTION4_CONTENT2_BP1'),
        t('HOME_SECTION4_CONTENT2_BP2'),
        t('HOME_SECTION4_CONTENT2_BP3'),
      ],
      buttonText: t('HOME_SECTION4_CONTENT2_CTA'),
      image: '/assets/main/section4/image_02.png',
      reverse: true,
      onClick: () => onClickLearningSpace(),
    },
    {
      id: 3,
      badge: t('HOME_SECTION4_CONTENT3_BADGE'),
      chipColor: 'red' as const,
      title: t('HOME_SECTION4_CONTENT3_TITLE'),
      subtitle: t('HOME_SECTION4_CONTENT3_DESC'),
      features: [
        t('HOME_SECTION4_CONTENT3_BP1'),
        {
          text: t('HOME_SECTION4_CONTENT3_BP2'),
          desc: t('HOME_SECTION4_CONTENT3_BP2_DESC'),
        },
        t('HOME_SECTION4_CONTENT3_BP3'),
      ],
      buttonText: t('HOME_SECTION4_CONTENT3_CTA'),
      image: '/assets/main/section4/image_03.png',
      reverse: false,
      onClick: onClickConsultation,
    },
  ];

  return (
    <>
      <section
        className="relative py-[140px] tb:py-[40px] mb:py-[40px] overflow-hidden"
        style={{
          background: 'linear-gradient(130.42deg, #FFA8A8 0%, #FFEDED 100%)',
        }}
      >
        {/* Background Blobs */}
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[#FFDADA] blur-[150px] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#FFE4D1] blur-[120px] rounded-full opacity-50 pointer-events-none" />

        {/* Background Circles */}
        <LazyImage
          src="/assets/main/section4/circle_01.png"
          className="absolute pointer-events-none w-[465px] h-[463px]"
          style={{ left: '10px', top: '-183px', opacity: 0.6 }}
        />
        <LazyImage
          src="/assets/main/section4/circle_02.png"
          className="absolute pointer-events-none w-[1054px] h-[1049px]"
          style={{ right: '-485px', top: '204px', opacity: 0.8 }}
        />
        <LazyImage
          src="/assets/main/section4/circle_01.png"
          className="absolute pointer-events-none w-[400px] h-[400px]"
          style={{
            right: '-155px',
            bottom: '512px',
            transform: 'rotate(45deg)',
            opacity: 0.6,
            mixBlendMode: 'screen',
          }}
        />
        <LazyImage
          src="/assets/main/section4/circle_02.png"
          className="absolute pointer-events-none w-[602px] h-[599px]"
          style={{
            left: '-174px',
            bottom: '317px',
            opacity: 0.8,
            mixBlendMode: 'multiply',
          }}
        />
        <LazyImage
          src="/assets/main/section4/circle_01.png"
          className="absolute pointer-events-none w-[810px] h-[806px]"
          style={{
            left: '-234px',
            bottom: '-241px',
            transform: 'rotate(-31.02deg)',
            opacity: 0.8,
            mixBlendMode: 'screen',
          }}
        />

        <div
          {...animatedSection}
          className="max-w-[min(1200px,calc(100%_-_80px))] sd:max-w-[min(944px,calc(100%_-_40px))] tb:max-w-[min(728px,calc(100%_-_40px))] sm:max-w-[min(328px,calc(100%_-_40px))] mx-auto relative z-10"
        >
          <div className="text-center mb-[80px]">
            <h1 className="h1-m tb:h4-m mb:h4-m break-keep leading-tight">
              {t('HOME_SECTION4_TITLE')}
            </h1>
          </div>

          <div className="flex flex-col gap-[80px] tb:gap-[40px] mb:gap-[40px]">
            {CARDS.map((card, idx) => (
              <CardItem key={card.id} card={card} index={idx} />
            ))}
          </div>
        </div>
      </section>
      <OnlyPCWarningModal {...warningModalProps} />
    </>
  );
}

function CardItem({ card, index }: { card: any; index: number }) {
  const animatedCard = useScrollFadeIn({ delay: 0.1 * index });

  return (
    <div
      {...animatedCard}
      className={`flex items-stretch gap-[40px] p-[40px] bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] tb:flex-col mb:flex-col tb:p-[32px] mb:p-[32px] tb:gap-[20px] mb:gap-[20px] tb:rounded-[24px] mb:rounded-[24px] ${
        card.reverse ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Image Area */}
      <div className="flex-1 w-full self-stretch min-h-[300px] tb:min-h-0 tb:self-auto mb:min-h-0 mb:self-auto tb:flex tb:justify-center mb:flex mb:justify-center">
        <div className="relative w-full h-full tb:w-[288px] tb:h-[160px] mb:w-[288px] mb:h-[160px] rounded-[24px] overflow-hidden">
          <LazyImage
            src={card.image}
            alt={card.badge}
            className="absolute inset-0 w-full h-full object-cover rounded-[24px]"
          />
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 w-full tb:flex tb:flex-col tb:items-center mb:flex mb:flex-col mb:items-center">
        <div className="flex items-center gap-[8px] mb-[16px]">
          {card.isNew && (
            <span className="px-[12px] h-[36px] tb:h-[31px] mb:h-[31px] inline-flex items-center bg-brand text-white p4-sb rounded-[4px]">
              NEW
            </span>
          )}
          <span className="px-[12px] h-[36px] tb:h-[31px] mb:h-[31px] inline-flex items-center bg-brand_3 text-brand p4-sb rounded-[4px]">
            {card.badge}
          </span>
        </div>

        <h2 className="h3-b tb:p1-b mb:p1-b mb-[12px] whitespace-pre-wrap sd:whitespace-normal tb:whitespace-normal mb:whitespace-normal break-keep leading-[1.3] tb:text-center mb:text-center">
          {card.title}
        </h2>
        <p className="p2-r mb-[28px] tb:whitespace-normal mb:whitespace-normal break-keep tb:text-center mb:text-center">
          {card.subtitle}
        </p>

        <ul className="flex flex-col gap-[8px] mb-[48px] tb:mb-[20px] mb:mb-[20px] w-full tb:w-[500px] tb:max-w-full mb:w-fit tb:mx-auto mb:mx-auto">
          {card.features.map((feature, fIdx) => {
            const text = typeof feature === 'string' ? feature : feature.text;
            const desc = typeof feature === 'string' ? '' : feature.desc;
            return (
              <li key={fIdx} className="flex items-start p4-sb">
                <LazyImage
                  src="/assets/main/section4/check.svg"
                  className="w-[22px] h-[22px] flex-shrink-0 mr-4"
                  alt="check"
                />
                <span className="p4-sb tb:whitespace-normal mb:whitespace-normal">
                  {text}
                  {desc && (
                    <span className="p6-r text-font-sub_2 ml-[4px]">
                      {desc}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        <ButtonUI
          size="lg"
          color="secondary"
          rounded
          onClick={card.onClick}
          className="bg-[#1A334E] text-white px-[32px] hover:!opacity-100 data-[hover=true]:!opacity-100 font-bold transition-transform hover:scale-110"
        >
          {card.buttonText}
        </ButtonUI>
      </div>
    </div>
  );
}

export default Section4;
