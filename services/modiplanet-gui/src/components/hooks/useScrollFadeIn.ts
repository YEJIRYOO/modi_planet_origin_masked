import { useCallback, useEffect, useRef } from 'react';

interface IUseScrollFadeIn {
  direction?: string;
  duration?: number;
  delay?: number;
}

const useScrollFadeIn = ({
  direction = 'up',
  duration = 1.5,
  delay = 0,
}: IUseScrollFadeIn) => {
  const dom = useRef<any>(null);

  const handleDirection = (name) => {
    switch (name) {
      case 'up':
        return 'translate3d(0, 10%, 0)';
      case 'down':
        return 'translate3d(0, -10%, 0)';
      case 'left':
        return 'translate3d(10%, 0, 0)';
      case 'right':
        return 'translate3d(-10%, 0, 0)';
      default:
        return;
    }
  };

  const handleScroll = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (!entry) return;
    const { current } = dom;

    if (entry?.isIntersecting && current) {
      current.style.transitionProperty = 'all';
      current.style.transitionDuration = `${duration}s`;
      current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
      current.style.transitionDelay = `${delay}s`;
      current.style.opacity = '1';
      current.style.transform = 'translate3d(0, 0, 0)';
    }
  }, []);

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold: 0.1,
        rootMargin: '0px',
      });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: handleDirection(direction),
    },
  };
};

export default useScrollFadeIn;
