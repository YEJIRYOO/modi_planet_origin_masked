import React, { Fragment, useMemo } from 'react';

interface IClassifierResultItem {
  label: string;
  floatRate: number;
}

function ClassifierResultItem({ floatRate, label }: IClassifierResultItem) {
  const IntRate = useMemo(() => {
    return Math.round(floatRate * 10000) / 100;
  }, [floatRate]);

  return (
    <div className="mb-[24px]">
      <p className="flex justify-between items-center mb-[8px]">
        <span className="p3-m truncate-wrapper">
          <span className="truncate">{label}</span>
        </span>
        <span className="p5-r shrink-0">{IntRate}%</span>
      </p>

      <div className="rounded-full h-[16px] bg-form-form">
        <div
          style={{
            width: `${IntRate}%`,
          }}
          className="h-full bg-brand rounded-full duration-100"
        />
      </div>
    </div>
  );
}

export default ClassifierResultItem;
