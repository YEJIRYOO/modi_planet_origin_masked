import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import useTranslator from '@hooks/useTranslator';
import useScrollFadeIn from '@hooks/useScrollFadeIn';
import LazyImage from '@components/ui_old/image/lazy-image';

type TReview = {
  image: string;
  text: string;
  footer: string;
};

function Section7() {
  const { t } = useTranslator();
  const animatedSection = useScrollFadeIn({});

  const REVIEWS: TReview[] = [
    {
      image: '/assets/main/section7/image_01.jpg',
      text: t('HOME_SECTION7_CARD1_REVIEW'),
      footer: t('HOME_SECTION7_CARD1_REVIEWER'),
    },
    {
      image: '/assets/main/section7/image_02.jpg',
      text: t('HOME_SECTION7_CARD2_REVIEW'),
      footer: t('HOME_SECTION7_CARD2_REVIEWER'),
    },
    {
      image: '/assets/main/section7/image_03.jpg',
      text: t('HOME_SECTION7_CARD3_REVIEW'),
      footer: t('HOME_SECTION7_CARD3_REVIEWER'),
    },
    {
      image: '/assets/main/section7/image_04.jpg',
      text: t('HOME_SECTION7_CARD4_REVIEW'),
      footer: t('HOME_SECTION7_CARD4_REVIEWER'),
    },
    {
      image: '/assets/main/section7/image_05.jpg',
      text: t('HOME_SECTION7_CARD5_REVIEW'),
      footer: t('HOME_SECTION7_CARD5_REVIEWER'),
    },
  ];

  return (
    <section
      {...animatedSection}
      className="py-[120px] tb:py-[60px] mb:py-[60px] bg-white overflow-hidden relative"
    >
      {/* Title Area */}
      <div className="max-w-[min(1200px,calc(100%_-_80px))] sd:max-w-[min(944px,calc(100%_-_40px))] tb:max-w-[min(728px,calc(100%_-_40px))] sm:max-w-[328px] mx-auto text-center mb-[80px] tb:mb-[48px] mb:mb-[48px]">
        <h1 className="h1-m tb:h4-m mb:h4-m mb-[80px] tb:mb-[40px] mb:mb-[40px]">
          {t('HOME_SECTION7_TITLE')}
        </h1>
      </div>

      {/* Slider Area - Centered to 1280px */}
      <div className="max-w-[min(1200px,calc(100%_-_80px))] sd:max-w-[min(944px,calc(100%_-_40px))] tb:max-w-[min(728px,calc(100%_-_40px))] sm:max-w-[360px] mx-auto relative h-[560px] tb:h-[340px] mb:h-[340px]">
        {/* White Gradient Overlays for Edge Fading */}
        <div
          className="absolute top-0 left-0 w-[120px] h-full z-20 pointer-events-none mb:hidden"
          style={{
            background:
              'linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-[120px] h-full z-20 pointer-events-none mb:hidden"
          style={{
            background:
              'linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
          }}
        />

        <Swiper
          modules={[Autoplay]}
          centeredSlides={true}
          slidesPerView={'auto'}
          initialSlide={2}
          spaceBetween={0}
          breakpoints={{
            0: { spaceBetween: -10 },
            1024: { spaceBetween: 0 },
          }}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="section-7-swiper h-full"
        >
          {REVIEWS.map((review, idx) => (
            <SwiperSlide
              key={idx}
              className="!w-[400px] h-full tb:!w-[280px] mb:!w-[280px] pointer-events-none z-[1] [&.swiper-slide-active]:pointer-events-auto [&.swiper-slide-active]:z-10 flex items-center [&>div]:scale-[0.8] [&>div]:opacity-80 [&>div]:transition-[transform,opacity,box-shadow] [&>div]:duration-[800ms] [&>div]:ease-[cubic-bezier(0.4,0,0.2,1)] [&.swiper-slide-active>div]:scale-100 [&.swiper-slide-active>div]:opacity-100 [&.swiper-slide-active>div]:shadow-[0px_4px_12px_0px_#ABABAB33]"
            >
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

const ReviewCard = ({ review }: { review: TReview }) => {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden flex flex-col h-[512px] tb:h-[320px] mb:h-[320px] outline outline-1 outline-[#E9ECEF] transition-all duration-700">
      {/* Top Image */}
      <div className="w-full h-[281px] tb:w-[280px] mb:w-[280px] tb:h-[153px] mb:h-[153px] overflow-hidden bg-[#F1F3F5]">
        <LazyImage
          src={review.image}
          alt="review site"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Content */}
      <div className="px-[24px] py-[24px] tb:px-5 mb:px-5 tb:py-5 mb:py-5 flex flex-col flex-1 items-stretch">
        {/* Stars */}
        <div className="flex gap-2 mb-[24px] tb:mb-[16px] mb:mb-[16px] justify-center">
          {[...Array(5)].map((_, i) => (
            <LazyImage
              src="/assets/main/section7/star.svg"
              alt="star"
              key={i}
              className="w-[28px] h-[28px] tb:w-[16px] mb:w-[16px] tb:h-[16px] mb:h-[16px]"
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="p4-r text-center mb-[24px] tb:mb-[12px] mb:mb-[12px] whitespace-pre-wrap sd:whitespace-normal tb:whitespace-normal mb:whitespace-normal break-keep">
          {review.text}
        </p>

        {/* Footer */}
        <div className="mt-auto text-right">
          <p className="p4-r text-font-sub_2">{review.footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Section7;
