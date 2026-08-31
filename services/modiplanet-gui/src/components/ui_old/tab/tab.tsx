import React, { Fragment, useState } from 'react';
import classnames from 'classnames';

export type TTabData = {
  id: number | string;
  label: string;
  content: JSX.Element;
};

interface ITab {
  data: Array<TTabData>;
  className?: string;
  labelClassName?: string;
  onClick?: (data: TTabData) => void;
  defaultId?: string | number;
}

export function Tab({
  data,
  className,
  labelClassName,
  onClick,
  defaultId,
}: ITab) {
  const [activeId, setActiveId] = useState<number | string>(
    defaultId ?? data[0].id,
  );
  const renderContent = () => {
    const activeTab = data.find((item) => item.id === activeId);

    if (activeTab) {
      return activeTab.content;
    }

    return null;
  };

  const onTabClick = (data: TTabData) => {
    setActiveId(data.id);
    onClick && onClick(data);
  };

  return (
    <Fragment>
      <ul
        className={classnames(
          'flex border-b border-brand_4 mb-10 text-font-sub_2 text-24 font-bold',
          className,
        )}
      >
        {data.map((data, index) => {
          const { id, label } = data;
          return (
            <li
              className={classnames([
                {
                  'text-brand border-b-2 border-brand mb-[-1px] font-bold':
                    id === activeId,
                },
                'mr-[30px] pb-[18px]',
                labelClassName,
              ])}
              role="button"
              key={index}
              onClick={() => onTabClick(data)}
            >
              {label}
            </li>
          );
        })}
      </ul>

      <div>{renderContent()}</div>
    </Fragment>
  );
}

export default Tab;
