import { Select, SelectItem } from '@nextui-org/react';
import useTranslator from '@hooks/useTranslator';
import { functionOptions } from '@lib/constants/select-options';

interface JoystickFunctionSelectProps {
  selectedFunction: string | null;
  onChange: (key: string) => void;
}

export default function JoystickFunctionSelect({
  selectedFunction,
  onChange,
}: JoystickFunctionSelectProps) {
  const { t } = useTranslator();

  return (
    <Select
      items={functionOptions['JOYSTICK'].map((option) => ({
        ...option,
        label: t(option.label),
      }))}
      placeholder={t('FUNCTION')}
      aria-label="functionType"
      classNames={{
        trigger:
          'bg-white border border-[#DDDDDD] shadow-none w-[230px] h-[46px]',
      }}
      selectedKeys={selectedFunction ? [selectedFunction] : []}
      onSelectionChange={(keys) => {
        const key = Array.from(keys).join('');
        onChange(key);
      }}
    >
      {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
    </Select>
  );
}
