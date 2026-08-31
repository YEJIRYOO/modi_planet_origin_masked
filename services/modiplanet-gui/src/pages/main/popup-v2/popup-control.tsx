import React, { ChangeEvent, useState } from 'react';
import moment from 'moment/moment';
import { useTranslation } from 'react-i18next';
import { storeDoNotShowPopupV2Timestamp } from '@lib/utils/utils';

import CheckboxUI from '@components/ui/Checkbox/CheckboxUI';

interface IPopupControl {
  onClose: () => void;
}

function PopupControl({ onClose }: IPopupControl) {
  const { t } = useTranslation();
  const [isCheck, setIsCheck] = useState(false);

  const onClickCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked);
  };

  const onClickClose = () => {
    if (isCheck) {
      storeDoNotShowPopupV2Timestamp(moment().utc().format());
    }
    onClose();
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <label className="flex items-center" role="button">
          <span className="mr-[4px] sm:mr-[4px]">
            <CheckboxUI id="do-not-show-popup-v2" onChange={onClickCheck} />
          </span>
          <span className="p3-m text-font-sub">{t('DO_NOT_OPEN_A_DAY')}</span>
        </label>
      </div>
      <div
        className="p3-m text-font-sub underline"
        role="button"
        onClick={onClickClose}
      >
        {t('CLOSE')}
      </div>
    </div>
  );
}

export default PopupControl;
