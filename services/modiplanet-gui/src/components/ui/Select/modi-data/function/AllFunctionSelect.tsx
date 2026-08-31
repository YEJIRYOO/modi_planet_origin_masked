import { Select, SelectItem } from '@nextui-org/react';
import useTranslator from '@hooks/useTranslator';
import { getSelectableFunctionOptions } from '@lib/constants/select-options';

interface AllFunctionSelectProps {
  selectedFunction: string | null;
  onChange: (key: string) => void;
}

export default function AllFunctionSelect({
  selectedFunction,
  onChange,
}: AllFunctionSelectProps) {
  const { t } = useTranslator();

  return (
    <Select
      items={Object.values(getSelectableFunctionOptions())
        .flat()
        .map((option) => ({
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
