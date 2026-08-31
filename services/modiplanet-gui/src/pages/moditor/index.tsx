import React, { useEffect, useMemo } from 'react';
import { isDesktop } from 'react-device-detect';
import { useDisclosure } from '@nextui-org/react';

import OnlyPCWarningModal from '@components/ui/common/Modal/OnlyPCWarningModal';

import { useQs } from '@hooks/useQs';
import { MODITOR_URL } from '@src/lib/constants/urls';

export default function ModitorPage() {
  const {
    path: { debug, locale },
  } = useQs();
  document.title = 'Moditor';

  const moditorURL = useMemo(() => {
    return `${MODITOR_URL}?locale=${locale}${debug ? '&debug=true' : ''}`;
  }, [locale]);

  const {
    isOpen: isWarningOpen,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();

  const onModalClose = () => {
    window.close();
    onWarningClose();
  };

  const checkDevice = () => {
    if (!isDesktop) {
      onWarningOpen();
    }
  };

  useEffect(() => {
    checkDevice();
  }, []);

  return (
    <>
      <div className="h-screen">
        <iframe
          src={moditorURL}
          width="100%"
          height="100%"
          allow="serial; usb; bluetooth *"
        />
      </div>
      <OnlyPCWarningModal isOpen={isWarningOpen} onClose={onModalClose} />
    </>
  );
}
