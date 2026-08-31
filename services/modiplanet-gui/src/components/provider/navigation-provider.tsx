import { useLayoutEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearNavigator, setNavigator } from '@src/lib/navigation';

interface NavigationProviderProps {
  children: ReactNode;
}

function NavigationProvider({ children }: NavigationProviderProps) {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setNavigator(navigate);

    return () => {
      clearNavigator(navigate);
    };
  }, [navigate]);

  return <>{children}</>;
}

export default NavigationProvider;
