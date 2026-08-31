import React from 'react';
import Pagination, { ReactJsPaginationProps } from 'react-js-pagination';

import Prev from '@src/lib/assets/chevron/prev.svg?react';
import Next from '@src/lib/assets/chevron/next.svg?react';
import Last from '@src/lib/assets/pagination/last.svg?react';
import First from '@src/lib/assets/pagination/first.svg?react';

export function CustomPagination(props: ReactJsPaginationProps) {
  const { activePage, totalItemsCount, itemsCountPerPage = 5 } = props;
  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);
  const chevStyle = 'stroke-font-main hover:stroke-brand sm:h-[6.5px]';
  const disabledChevStyle = 'stroke-font-non sm:h-[6.5px]';

  return (
    <Pagination
      pageRangeDisplayed={5}
      innerClass="pagination"
      activeClass="active"
      itemClass="item"
      itemClassPrev="chev prev"
      itemClassNext="chev next"
      itemClassFirst="chev first"
      itemClassLast="chev last"
      lastPageText={
        <Last
          className={
            activePage === totalPages || totalPages === 0
              ? disabledChevStyle
              : chevStyle
          }
        />
      }
      firstPageText={
        <First className={activePage === 1 ? disabledChevStyle : chevStyle} />
      }
      prevPageText={
        <Prev className={activePage === 1 ? disabledChevStyle : chevStyle} />
      }
      nextPageText={
        <Next
          className={
            activePage === totalPages || totalPages === 0
              ? disabledChevStyle
              : chevStyle
          }
        />
      }
      {...props}
    />
  );
}

export default Pagination;
