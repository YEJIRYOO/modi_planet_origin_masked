import { Select, SelectItem } from '@nextui-org/react';
import useTranslator from '@hooks/useTranslator';
import {
  ProjectConnectionOrder,
  ProjectConnectionField,
  OrderDirectionType,
} from '@services/gen/gen';

interface ProjectSortSelectorProps {
  sortOrder: ProjectConnectionOrder;
  onChange: (order: ProjectConnectionOrder) => void;
}

const sortOptions = [
  {
    value: {
      field: ProjectConnectionField.CreatedAt,
      direction: OrderDirectionType.Desc,
    },
    labelKey: 'NEWEST',
    key: 'CREATED_AT_DESC',
  },
  {
    value: {
      field: ProjectConnectionField.CreatedAt,
      direction: OrderDirectionType.Asc,
    },
    labelKey: 'OLDEST',
    key: 'CREATED_AT_ASC',
  },
  {
    value: {
      field: ProjectConnectionField.Title,
      direction: OrderDirectionType.Asc,
    },
    labelKey: 'NAME_ASC',
    key: 'TITLE_ASC',
  },
  {
    value: {
      field: ProjectConnectionField.Title,
      direction: OrderDirectionType.Desc,
    },
    labelKey: 'NAME_DESC',
    key: 'TITLE_DESC',
  },
];

export default function ProjectSortSelector({
  sortOrder,
  onChange,
}: ProjectSortSelectorProps) {
  const { t } = useTranslator();

  const translatedSortOptions = sortOptions.map((option) => ({
    ...option,
    label: t(option.labelKey),
  }));

  return (
    <Select
      items={translatedSortOptions}
      aria-label="sortOrder"
      classNames={{
        trigger:
          'bg-white border border-[#DDDDDD] shadow-none w-[160px] sm:w-[120px] h-[46px]',
      }}
      selectedKeys={[
        sortOptions.find(
          (opt) =>
            opt.value.field === sortOrder.field &&
            opt.value.direction === sortOrder.direction,
        )?.key || 'CREATED_AT_DESC',
      ]}
      onSelectionChange={(keys) => {
        const key = Array.from(keys).join('');
        const selected = sortOptions.find((opt) => opt.key === key);
        if (selected) {
          onChange(selected.value);
        }
      }}
    >
      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    </Select>
  );
}
