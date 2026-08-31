import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Controls from '@src/pages/main/v3/section-1/controls';
import useTranslator from '@hooks/useTranslator';
import { Swiper as SwiperClass } from 'swiper/types';
import useLinkValidation from '@hooks/useLinkValidation';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import OnlyPCWarningModal from '@components/ui/common/Modal/OnlyPCWarningModal';

interface ISection1 {}

function Section1({}: ISection1) {
  const [imageSwiper, setImageSwiper] = useState<null | SwiperClass>(null);
  const { onClickCodeEditor, onClickLearningSpace, warningModalProps } =
    useLinkValidation();

  const { t, isKorean } = useTranslator();

  const onClickBanner2 = (e) => {
    e.stopPropagation();
    onClickLearningSpace();
  };

  return (
    <>
      <section className="w-full relative overflow-hidden">
        <Swiper
          onSwiper={setImageSwiper}
          slidesPerView={1}
          loop={true}
          allowTouchMove={false}
          pagination={{
            clickable: false,
          }}
          className="section1 h-[701px] tb:h-[524px] mb:h-[524px]"
        >
          <SwiperSlide>
            <div className="relative w-full h-[701px] overflow-hidden px-[60px] sd:px-0 tb:px-0 mb:px-0 tb:h-[524px] mb:h-[524px]">
              <img
                className="absolute top-0 left-1/2 -translate-x-1/2 min-w-[1920px] w-full h-[701px] object-cover tb:h-[524px] mb:h-[524px]"
                src="/assets/main/section1/image_01.jpg"
                alt="main-1"
              />
              <div
                className="hidden mb:block absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(270deg, rgba(255, 136, 138, 0.4) 0%, #FF888A 100%)',
                }}
              />
              <div className="max-w-[1280px] sd:max-w-[904px] tb:max-w-[728px] mb:max-w-[328px] mx-auto relative h-full">
                <div className="absolute top-1/2 -translate-y-1/2 z-20">
                  <h1 className="text-[80px] font-bold tracking-tight mb-[20px] tb:text-[32px] mb:text-[32px] whitespace-pre-wrap mb:whitespace-normal break-keep">
                    {t('HOME_BANNER_TITLE_1')}
                  </h1>
                  <div className="p1-r mb-[40px] tb:w-[364px] whitespace-pre-wrap sd:whitespace-normal tb:whitespace-normal mb:whitespace-normal break-keep">
                    {t('HOME_BANNER_DESC_1')}
                  </div>
                  <ButtonUI
                    onClick={() => onClickCodeEditor()}
                    size="lg"
                    color="secondary"
                    className="rounded-full transition-transform hover:scale-110 data-[hover=true]:!opacity-100 hover:!opacity-100"
                  >
                    <p className="p3-b">{t('HOME_BANNER_CTA_1')}</p>
                  </ButtonUI>
                </div>

                <div className="absolute right-0 top-0 h-[701px] w-[60%] z-0 pointer-events-none transition-all duration-300 tb:h-[524px] mb:h-[524px] tb:w-full mb:w-full">
                  <img
                    className="absolute top-[40%] right-[1%] w-[258px] sd:top-[35%] sd:right-[-8%] sd:w-[206px] object-contain tb:top-[27%] tb:right-[0px] tb:w-[103px] mb:top-[22%] mb:right-[-12px] mb:w-[103px] animate-float-d1 z-0"
                    src="/assets/main/section1/illust_03.svg"
                    alt="illustration deco top"
                  />
                  <img
                    className="absolute bottom-[1%] right-[28%] w-[266px] sd:bottom-[1%] sd:right-[4%] sd:w-[212px] object-contain tb:bottom-[12%] tb:right-[100px] tb:w-[106px] mb:bottom-[8%] mb:right-[-30px] mb:w-[106px] animate-float-d2 z-0"
                    src="/assets/main/section1/illust_04.svg"
                    alt="illustration deco bottom"
                  />
                  <img
                    className="absolute top-[1%] right-[5%] w-[480px] sd:w-[384px] sd:top-[5%] sd:right-[0%] object-contain sd:top-[1%] sd:right-[5%] tb:top-[8%] tb:right-[20px] tb:h-auto tb:w-[177px] mb:top-[3%] mb:right-[2px] mb:h-auto mb:w-[177px] animate-float z-10"
                    src="/assets/main/section1/illust_01.svg"
                    alt="illustration top"
                  />
                  <img
                    className="absolute bottom-[5%] right-[35%] sd:bottom-[5%] sd:right-[10%] w-[330px] sd:w-[264px] object-contain tb:bottom-[12%] tb:right-[100px] tb:h-auto tb:w-[161px] mb:bottom-[10%] mb:right-[0px] mb:h-auto mb:w-[132px] animate-float-d3 z-10"
                    src="/assets/main/section1/illust_02.svg"
                    alt="illustration bottom"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative w-full h-[701px] overflow-hidden px-[60px] sd:px-0 tb:px-0 mb:px-0 tb:h-[524px] mb:h-[524px]">
              <img
                className="absolute top-0 left-1/2 -translate-x-1/2 min-w-[1920px] w-full h-[701px] object-cover tb:h-[524px] mb:h-[524px]"
                src="/assets/main/section1/image_02.jpg"
                alt="main-2"
              />
              <div
                className="hidden mb:block absolute inset-0 z-[5] pointer-events-none"
                style={{
                  background:
                    'linear-gradient(270deg, rgba(255, 136, 138, 0.4) 0%, #FF888A 100%)',
                }}
              />
              <div className="max-w-[1280px] sd:max-w-[904px] tb:max-w-[728px] mb:max-w-[328px] mx-auto relative h-full">
                <div className="absolute top-1/2 -translate-y-1/2 z-10">
                  <h1
                    className={`text-[80px] font-bold tracking-tight mb-[20px] tb:text-[32px] mb:text-[32px] whitespace-pre-wrap break-keep ${
                      isKorean ? 'leading-[1.2]' : 'leading-[1]'
                    }`}
                  >
                    {t('HOME_BANNER_TITLE_2')}
                  </h1>
                  <div
                    className={`p1-r mb-[40px] whitespace-pre-wrap ${
                      isKorean
                        ? ''
                        : 'tb:whitespace-normal mb:whitespace-normal'
                    } tb:w-[364px] break-keep`}
                  >
                    {t('HOME_BANNER_DESC_2')}
                  </div>
                  <ButtonUI
                    onClick={onClickBanner2}
                    size="lg"
                    color="secondary"
                    className="rounded-full transition-transform hover:scale-110 data-[hover=true]:!opacity-100 hover:!opacity-100"
                  >
                    <p className="p3-b">{t('HOME_BANNER_CTA_2')}</p>
                  </ButtonUI>
                </div>

                <div className="absolute right-0 top-0 h-[701px] w-[60%] z-0 pointer-events-none transition-all duration-300 tb:h-[524px] mb:h-[524px] tb:w-full mb:w-full">
                  <img
                    className={`absolute object-contain animate-float-gentle-d1 z-10 ${
                      isKorean
                        ? 'top-[23%] right-[1%] w-[572px] sd:top-[47%] sd:right-[-13%] sd:w-[400px] tb:top-[35%] tb:right-[0px] tb:w-[320px] mb:top-[40%] mb:right-[10px] mb:w-[256px]'
                        : 'top-[31%] right-[1%] w-[469px] sd:top-[58%] sd:right-[-2%] sd:w-[323px] tb:top-[40%] tb:right-[30px] tb:w-[262px] mb:top-[40%] mb:right-[10px] mb:w-[210px]'
                    }`}
                    src={
                      isKorean
                        ? '/assets/main/section1/illust_05_ko.png'
                        : '/assets/main/section1/illust_05_global.png'
                    }
                    alt="illustration laptop"
                  />
                  <img
                    className={`absolute object-contain animate-float-gentle-d2 z-20 ${
                      isKorean
                        ? 'top-[46%] right-[64%] w-[163px] sd:top-[62%] sd:right-[52%] sd:w-[114px] tb:top-[50%] tb:right-[35%] tb:w-[91px] mb:top-[56%] mb:right-[70%] mb:w-[73px]'
                        : 'top-[53%] right-[55%] w-[134px] sd:top-[76%] sd:right-[52%] sd:w-[94px] tb:top-[58%] tb:right-[35%] tb:w-[75px] mb:top-[56%] mb:right-[55%] mb:w-[60px]'
                    }`}
                    src={
                      isKorean
                        ? '/assets/main/section1/illust_06_ko.png'
                        : '/assets/main/section1/illust_06_global.png'
                    }
                    alt="illustration card"
                  />
                  <img
                    className={`absolute object-contain animate-float-gentle-d3 z-20 ${
                      isKorean
                        ? 'bottom-[18%] right-[-14%] w-[226px] sd:bottom-[10%] sd:right-[-20%] sd:w-[157px] tb:bottom-[20%] tb:right-[-40px] tb:w-[126px] mb:bottom-[22%] mb:right-[-30px] mb:w-[101px]'
                        : 'bottom-[12%] right-[-13%] w-[226px] sd:bottom-[4%] sd:right-[-15%] sd:w-[158px] tb:bottom-[20%] tb:right-[-20px] tb:w-[126px] mb:bottom-[25%] mb:right-[-10px] mb:w-[101px]'
                    }`}
                    src="/assets/main/section1/illust_07.png"
                    alt="illustration robot"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="pointer-events-none absolute inset-0 z-50 px-[60px] sd:px-0 tb:px-0 mb:px-0">
          <div className="max-w-[1280px] sd:max-w-[904px] tb:max-w-[728px] mb:max-w-[328px] mx-auto relative h-full">
            <div className="pointer-events-auto absolute bottom-[64px] tb:bottom-[40px] mb:bottom-[40px]">
              <Controls imageSwiper={imageSwiper} />
            </div>
          </div>
        </div>
      </section>
      <OnlyPCWarningModal {...warningModalProps} />
    </>
  );
}

export default Section1;
