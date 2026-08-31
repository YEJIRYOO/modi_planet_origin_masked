import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Pause, Play } from '@src/lib/newAssets';
import { Swiper as SwiperClass } from 'swiper/types';

interface IControls {
  imageSwiper: SwiperClass | null;
}

function Controls({ imageSwiper }: IControls) {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [isAutoplay, setIsAutoPlay] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null);
  const [, setTick] = useState(0);

  const forceRerender = () => {
    setTick((p) => p + 1);
  };

  const resetProgress = () => {
    progressRef.current && progressRef.current.classList.remove('active_8s');

    setTimeout(() => {
      progressRef.current && progressRef.current.classList.add('active_8s');
    }, 10);
  };

  const onClickPrev = () => {
    if (!imageSwiper) return;
    imageSwiper.slidePrev();
    isAutoplay && resetProgress();

    forceRerender();
  };

  const onClickNext = () => {
    if (!imageSwiper) return;
    imageSwiper.slideNext();
    isAutoplay && resetProgress();

    forceRerender();
  };

  const onClickPauseAndPlay = () => {
    if (isAutoplay) {
      setIsAutoPlay(false);
      intervalRef.current && clearInterval(intervalRef.current);
      progressRef.current && progressRef.current.classList.remove('active_8s');
    } else {
      setIsAutoPlay(true);
      registerInterval();
      progressRef.current && progressRef.current.classList.add('active_8s');
    }
  };

  const registerInterval = () => {
    const callback = () => {
      if (!progressRef.current || !imageSwiper) return;
      resetProgress();
      imageSwiper.slideNext();
      forceRerender();
    };

    intervalRef.current = setInterval(callback, 8100);
  };

  useEffect(() => {
    registerInterval();

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [imageSwiper, isReset]);

  useEffect(() => {
    if (!progressRef.current) return;
    setTimeout(() => {
      progressRef.current && progressRef.current.classList.add('active_8s');
    }, 10);
  }, []);

  return (
    <div className="flex items-center">
      <div className="flex items-center p6-sb text-white mr-[30px]">
        <button onClick={onClickPrev} className="section-1-prev mr-[15px]">
          <ChevronLeft size={18} color={'#fff'} />
        </button>
        <span className="mr-[13px] w-[18px]">
          0{(imageSwiper?.realIndex || 0) + 1}
        </span>
        <div className="progress-bar bg-[#ffffff30]  w-[60px] shrink-0">
          <div ref={progressRef} className="progress-bar__bar bg-white" />
        </div>
        <span className="ml-[13px] w-[18px]">02</span>
        <button onClick={onClickNext} className="section-1-next ml-[15px]">
          <ChevronRight size={18} color={'#fff'} />
        </button>
      </div>

      <button
        className="w-[33px] h-[33px] rounded-full flex-center bg-[#d9d9d930] [&_path]:fill-white"
        onClick={onClickPauseAndPlay}
      >
        {isAutoplay ? <Play /> : <Pause />}
      </button>
    </div>
  );
}

export default Controls;
