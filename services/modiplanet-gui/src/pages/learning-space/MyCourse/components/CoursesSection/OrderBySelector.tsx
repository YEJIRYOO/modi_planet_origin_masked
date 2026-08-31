import { Select, SelectItem } from '@nextui-org/react';
import useTranslator from '@src/components/hooks/useTranslator';
import { CourseConnectionOrderFieldType } from '@services/gen/gen';
import { useTranslation } from 'react-i18next';

interface OrderBySelectorProps {
  value: CourseConnectionOrderFieldType;
  onChange: (value: CourseConnectionOrderFieldType) => void;
}

export default function OrderBySelector({
  value,
  onChange,
}: OrderBySelectorProps) {
  const { t } = useTranslator();
  const { i18n } = useTranslation();

  const options = [
    {
      key: CourseConnectionOrderFieldType.LastAccessedAt,
      label: t('RECENTLY_STUDIED'),
    },
    { key: CourseConnectionOrderFieldType.Name, label: t('NAME_DESC_2') },
  ];

  const selectorWidth =
    i18n.language === 'en'
      ? 'w-[190px]'
      : i18n.language === 'ko'
      ? 'w-[180px]'
      : i18n.language === 'pl'
      ? 'w-[240px]'
      : 'w-[260px]';

  return (
    <div className="mb-[40px] flex justify-end">
      <Select
        aria-label="course-order-by"
        selectedKeys={[value]}
        onSelectionChange={(keys) => {
          const selected = Array.from(
            keys,
          )[0] as CourseConnectionOrderFieldType;
          onChange(selected);
        }}
        className={selectorWidth}
        classNames={{
          trigger: 'bg-white border border-[#DDDDDD] shadow-none h-[46px]',
        }}
        disallowEmptySelection
      >
        {options.map((option) => (
          <SelectItem key={option.key} textValue={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
