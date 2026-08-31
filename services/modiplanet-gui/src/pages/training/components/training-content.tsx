import React, { ReactNode } from 'react';

interface ITrainingContent {
  children: ReactNode;
}

function TrainingContent({ children }: ITrainingContent) {
  return (
    <section className="max-w-[1920px] bg-white flex-1 overflow-y-auto overflow-hidden">
      {children}
    </section>
  );
}

export default TrainingContent;
