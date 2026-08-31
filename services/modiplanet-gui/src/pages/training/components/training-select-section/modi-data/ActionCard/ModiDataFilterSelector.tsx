import { Select, SelectItem } from '@nextui-org/react';
import { moduleOptions } from '@lib/constants/select-options';
import useTranslator from '@hooks/useTranslator';
import { useMemo } from 'react';
import ButtonFunctionSelect from '@components/ui/Select/modi-data/function/ButtonFunctionSelect';
import DialFunctionSelect from '@components/ui/Select/modi-data/function/DailFunctionSelect';
import TofFunctionSelect from '@components/ui/Select/modi-data/function/TofFunctionSelect';
import JoystickFunctionSelect from '@components/ui/Select/modi-data/function/JoystickFunctionSelect';
import EnvironmentFunctionSelect from '@components/ui/Select/modi-data/function/EnvironmentFunctionSelect';
import ImuFunctionSelect from '@components/ui/Select/modi-data/function/ImuFunctionSelect';
import AllFunctionSelect from '@components/ui/Select/modi-data/function/AllFunctionSelect';

interface ModiDataFilterSelectorProps {
  selectedModule: string | null;
  selectedFunction: string | null;
  handleModuleChange: (key: string) => void;
  handleFunctionChange: (key: string) => void;
}

function ModiDataFilterSelector({
  selectedModule,
  selectedFunction,
  handleModuleChange,
  handleFunctionChange,
}: ModiDataFilterSelectorProps) {
  const { t } = useTranslator();

  const translatedModuleOptions = moduleOptions.map((option) => ({
    ...option,
    label: t(option.label),
  }));

  const FunctionSelect = useMemo(() => {
    const moduleType = selectedModule as keyof typeof SelectMap;
    const SelectMap = {
      ALL: AllFunctionSelect,
      BUTTON: ButtonFunctionSelect,
      DIAL: DialFunctionSelect,
      TOF: TofFunctionSelect,
      JOYSTICK: JoystickFunctionSelect,
      ENVIRONMENT: EnvironmentFunctionSelect,
      IMU: ImuFunctionSelect,
    };

    if (!moduleType) {
      return SelectMap['ALL'];
    } else {
      return SelectMap[moduleType];
    }
  }, [selectedModule]);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Select
            items={translatedModuleOptions}
            placeholder={t('MODULE')}
            aria-label="moduleType"
            classNames={{
              trigger:
                'bg-white border border-[#DDDDDD] shadow-none w-[230px] h-[46px]',
            }}
            selectedKeys={selectedModule ? [selectedModule] : []}
            onSelectionChange={(keys) => {
              const key = Array.from(keys).join('');
              handleModuleChange(key);
            }}
          >
            {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
          </Select>
          <FunctionSelect
            selectedFunction={selectedFunction}
            onChange={handleFunctionChange}
          />
        </div>
      </div>
    </>
  );
}

export default ModiDataFilterSelector;
