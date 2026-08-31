import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FAQItem from '@src/pages/cs/faq/faq-item';

import BoardMessage from '@components/ui_old/board/board-message';
import { FaqNode } from '@src/services/gen/gen';

interface IFAQComponent {
  faqList: FaqNode[];
  pageNumber: number;
  first: number;
  openedIndex: number | null;
  setOpenedIndex: (index: number | null) => void;
}

export function FAQComponent({ faqList, pageNumber, first, openedIndex, setOpenedIndex }: IFAQComponent) {
  const { t } = useTranslation();

  const toggle = (index: number) => {
    return () => {
      if (openedIndex === null || openedIndex !== index) {
        setOpenedIndex(index);
      } else {
        setOpenedIndex(null);
      }
    };
  };

  const itemIndex = useMemo((): number => {
    return Number(faqList.length + first * pageNumber);
  }, [faqList]);

  return (
    <div className="mb-10 sm:mb-0">
      {faqList.length > 0 ? (
        faqList.map((inquiry, index) => (
          <FAQItem
            key={index}
            faq={inquiry}
            onClick={toggle(index)}
            isOpen={openedIndex === index}
            itemIndex={itemIndex - index}
          />
        ))
      ) : (
        <BoardMessage text={t('NO_FAQ')} />
      )}
    </div>
  );
}

export default FAQComponent;
