import React, { useEffect, useRef } from 'react';

interface ILazyImage extends React.ImgHTMLAttributes<HTMLImageElement> {}

function LazyImage({ src, ...rest }: ILazyImage) {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const options = {
      rootMargin: '300px',
    };
    const callback = (entries: any) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <img ref={ref} data-src={src} loading="lazy" decoding="async" {...rest} />
    </>
  );
}

export default LazyImage;
