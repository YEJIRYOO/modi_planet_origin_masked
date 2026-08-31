import { Input, type InputProps } from '@nextui-org/react';

interface InputUIProps extends InputProps {
  children?: React.ReactNode;
}

function InputUI({ children, classNames, ...props }: InputUIProps) {
  return (
    <Input
      isClearable
      spellCheck={false}
      {...props}
      classNames={{
        inputWrapper:
          'bg-white border border-[#DDDDDD] !shadow-none !ring-0 h-[46px] data-[hover=true]:bg-white group-data-[focus=true]:bg-white group-data-[focus-visible=true]:!ring-0 group-data-[focus-visible=true]:!ring-offset-0',
        errorMessage: 'text-start',
      }}
    >
      {children}
    </Input>
  );
}

export default InputUI;
