import { Input, type InputProps } from '@nextui-org/react';

interface ErrorBorderedInputUIProps extends InputProps {
  children?: React.ReactNode;
  isInvalid?: boolean;
}

function ErrorBorderedInputUI({
  children,
  classNames,
  isInvalid,
  ...props
}: ErrorBorderedInputUIProps) {
  return (
    <Input
      isClearable
      spellCheck={false}
      {...props}
      classNames={{
        inputWrapper: `bg-white border ${
          isInvalid ? '!border-[#FF4547]' : 'border-[#DDDDDD]'
        } !shadow-none !ring-0 h-[46px] data-[hover=true]:bg-white group-data-[focus=true]:bg-white group-data-[focus-visible=true]:!ring-0 group-data-[focus-visible=true]:!ring-offset-0 ${
          classNames?.inputWrapper || ''
        }`,
        errorMessage: `text-start ${classNames?.errorMessage || ''}`,
        ...classNames,
      }}
    >
      {children}
    </Input>
  );
}

export default ErrorBorderedInputUI;
