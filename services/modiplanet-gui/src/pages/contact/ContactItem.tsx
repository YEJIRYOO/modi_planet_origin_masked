import React, { Fragment, useState } from 'react';

import { localizeUTC } from '@lib/utils/utils';
import useTranslator from '@hooks/useTranslator';
import { ContactListItemModel } from '@services/client-model/contact';

interface ContactItemProps {
  contact: ContactListItemModel;
  index: number;
}

export function ContactItem({
  contact: {
    createdAt,
    fileList,
    responseMessage,
    content,
    subject,
    title,
    state,
    respondedAt,
  },
  index,
}: ContactItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslator();
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Fragment>
      <div
        className="flex items-center h-[70px] text-center cursor-pointer bg-white border-b border-form-border px-5 sm:px-0"
        onClick={toggle}
      >
        <span className="inline-block w-[75px] sm:w-[32px]">{index}</span>
        <span className="inline-block w-[100px] font-semibold sm:w-[80px]">
          {t(`INQUIRY_${subject}`)}
        </span>
        <span className="inline-block flex-1 text-left font-semibold pl-5 ellipsis-2">
          {title}
        </span>
        <span className="inline-block w-[120px] sm:w-[80px]">
          {createdAt && localizeUTC(createdAt, 'date')}
        </span>
        <span className="inline-block w-[120px] sm:w-[80px]">
          {t(`INQUIRY_${state}`)}
        </span>
      </div>

      {isOpen && (
        <div className="bg-white py-9 pl-[95px] pr-5 text-left break-all sm:pl-[32px] sm:pr-0 sm:p-3">
          <div className="flex mb-10">
            <span className="w-[100px] text-center font-semibold text-font-sub_1 text-16 shrink-0 mr-5 sm:w-[80px]">
              {t('INQUIRY_CONTENT')}
            </span>
            <div className="flex-1 mr-[240px] sm:mr-[160px]">{content}</div>
            {fileList.length > 0 && (
              <a
                href={fileList[0].url || ''}
                className="w-[98px] rounded-8 border-brand border-2 text-15 text-center leading-6 font-bold text-brand py-[6px]"
              >
                {t('ATTACHMENT')}
              </a>
            )}
          </div>

          <div className="flex">
            <span className="w-[100px] text-center font-semibold text-brand text-16 shrink-0 mr-5 sm:w-[80px]">
              {t('INQUIRY_RESPONSE')}
            </span>
            <div className="flex-1">
              {responseMessage || t('WAITING_FOR_RESPONSE')}
            </div>
            <span className="w-[120px] text-center sm:w-[80px]">
              {/*{localizeUTC(responseDate, 'date')}*/}
            </span>
            <span className="w-[120px] text-center sm:w-[80px]">
              {/* TODO: 첨부파일 */}
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default ContactItem;
