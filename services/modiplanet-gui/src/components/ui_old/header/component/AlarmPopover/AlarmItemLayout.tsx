import { Divider } from '@nextui-org/react';

interface AlarmItemLayout {
  children: JSX.Element | null;
  isLast?: boolean;
}

export function AlarmItemLayout({ children, isLast }: AlarmItemLayout) {
  return (
    <>
      <div className="w-full flex items-start duration-200 rounded-8">
        {children}
      </div>
      {!isLast && <Divider className="my-5" />}
    </>
  );
}

export default AlarmItemLayout;
