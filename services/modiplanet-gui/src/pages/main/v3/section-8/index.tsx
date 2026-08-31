import React from 'react';
import useTranslator from '@hooks/useTranslator';
import useScrollFadeIn from '@hooks/useScrollFadeIn';
import { motion } from 'framer-motion';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import LazyImage from '@components/ui_old/image/lazy-image';
import { FORM_LINKS } from '@src/pages/main/v3/constants';

interface ISection8 {}

function Section8({}: ISection8) {
  const { t, isKorean } = useTranslator();
  const animatedItem = useScrollFadeIn({
    direction: 'up',
    duration: 1,
    delay: 0.2,
  });

  const onClickConsultation = () => {
    window.open(
      isKorean ? FORM_LINKS.CONSULTATION.ko : FORM_LINKS.CONSULTATION.global,
      '_blank',
    );
  };

  return (
    <section
      className="relative overflow-hidden py-[140px] tb:py-[40px] mb:py-[40px]"
      style={{
        background: 'linear-gradient(130.42deg, #FFA8A8 0%, #FFEDED 100%)',
      }}
    >
      {/* Background Circles */}
      <LazyImage
        src="/assets/main/section8/circle_01.png"
        className="absolute pointer-events-none w-[894px] h-[889px] left-[-160px] tb:left-[-700px] mb:left-[-300px] top-[-330px] opacity-60 mix-blend-screen"
      />
      <LazyImage
        src="/assets/main/section8/circle_02.png"
        className="absolute pointer-events-none w-[454px] h-[452px] right-[-30px] tb:right-[-300px] mb:right-[-300px] top-[356px] tb:top-[-30px] mb:top-[-30px] opacity-40 mix-blend-multiply"
      />

      <div className="max-w-[min(1200px,calc(100%_-_80px))] sd:max-w-[min(944px,calc(100%_-_40px))] tb:max-w-[min(728px,calc(100%_-_40px))] sm:max-w-[min(328px,calc(100%_-_40px))] mx-auto relative z-10">
        <div
          {...animatedItem}
          className="flex flex-col items-center text-center"
        >
          <h1 className="h1-b tb:h4-b mb:h4-b break-keep mb-[80px] tb:mb-[24px] mb:mb-[24px] whitespace-pre-wrap break-keep">
            {t('HOME_SECTION8_TITLE')}
          </h1>

          <p className="h4-m tb:p2-m mb:p2-m mb-[80px] tb:mb-[24px] mb:mb-[24px] whitespace-pre-wrap tb:whitespace-no-wrap mb:whitespace-no-wrap break-keep">
            {t('HOME_SECTION8_DESC')}
          </p>

          <ButtonUI
            color="secondary"
            size="lg"
            onClick={onClickConsultation}
            rounded
            className="hover:!opacity-100 data-[hover=true]:!opacity-100 transition-transform hover:scale-110"
          >
            <p className="p3-b">{t('HOME_SECTION8_CTA')}</p>
          </ButtonUI>
        </div>
      </div>
    </section>
  );
}

export default Section8;
