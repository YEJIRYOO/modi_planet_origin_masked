import { useEffect, useState } from 'react';

const useClickElementDetection = (
  ref: React.RefObject<HTMLElement | null>,
  ignore?: boolean,
) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ignore) {
        return;
      }

      if (ref && ref.current && ref.current.contains(event.target)) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, ignore]);

  return {
    isClicked,
  };
};

export default useClickElementDetection;
