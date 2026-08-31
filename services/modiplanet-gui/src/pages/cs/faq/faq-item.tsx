import React, { Fragment, useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { FaqNode } from '@src/services/gen/gen';
import { localizeUTC } from '@src/lib/utils/utils';
import useTranslator from '@hooks/useTranslator';

interface IFAQItemProps {
  isOpen: boolean;
  faq: Partial<FaqNode>;
  onClick: () => void;
  itemIndex: number;
}

export function FAQItem({ faq, isOpen, onClick, itemIndex }: IFAQItemProps) {
  const { title, content, id, createdAt } = faq;
  const { t } = useTranslator();

  const getDate = useMemo(() => {
    return localizeUTC(createdAt, 'date');
  }, [createdAt]);

  return (
    <Fragment>
      <div className="flex flex-col">
        <div
          role="button"
          onClick={onClick}
          className="group flex items-center h-[72px] border-b border-form-border bg-white p-[0_57px_0_47px] duration-200 sm:flex-col sm:h-[86px] sm:items-stretch sm:p-[15px_20px]"
        >
          <p className="mr-[47px] text-font-sub sm:text-14 sm:mb-2">
            {itemIndex}
          </p>
          <p className="flex-grow-[1] font-semibold group-hover:font-bold text-ellipsis overflow-hidden whitespace-nowrap pr-10">
            {title}
          </p>
          <p className="shrink-0 sm:hidden text-font-sub">
            <span>{t('ADMIN')}</span>
            <span className="inline-block text-right  ml-[80px] w-[100px] sm:ml-[10px]">
              {getDate}
            </span>
          </p>
        </div>

        {isOpen && (
          <div className="w-full text-left text-font-sub_1 p-[30px_155px] flex bg-white border-b border-form-border sm:p-[20px_15px]">
            <div className="text-left pr-[77px] pt-1 sm:pr-[15px]">
              <div className="w-[11px]">
                <img
                  className="w-full"
                  src="/assets/corner-down-right.svg"
                  alt="corner-down-right"
                />
              </div>
            </div>
            <div className="html-content p4-r">{ReactHtmlParser(content)}</div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default FAQItem;
