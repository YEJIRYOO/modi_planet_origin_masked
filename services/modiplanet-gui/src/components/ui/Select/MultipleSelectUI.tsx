import { Select, SelectItem, Checkbox } from '@nextui-org/react';
import { Selection } from '@nextui-org/react';

interface MultipleSelectUIProps<T> {
  items: T[];
  label?: string;
  placeholder?: string;
  selectedKeys: Selection;
  onSelectionChange: (keys: Selection) => void;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  disabledKeys?: Set<string>;
  className?: string;
  classNames?: {
    trigger?: string;
    label?: string;
    value?: string;
    listbox?: string;
    popoverContent?: string;
  };
}

export default function MultipleSelectUI<T>({
  items,
  label,
  placeholder,
  selectedKeys,
  onSelectionChange,
  getKey,
  getLabel,
  disabledKeys,
  className,
  classNames,
}: MultipleSelectUIProps<T>) {
  const selectedCount =
    selectedKeys === 'all'
      ? items.filter((item) => !disabledKeys?.has(getKey(item))).length
      : [...selectedKeys].filter((key) => !disabledKeys?.has(String(key)))
          .length;

  return (
    <Select
      items={items}
      placeholder={placeholder}
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      aria-label={label || placeholder}
      className={className}
      classNames={{
        ...classNames,
        value: `${classNames?.value || ''}`,
      }}
      disabledKeys={disabledKeys}
      disallowEmptySelection={false}
      renderValue={() => {
        const displayText = label || placeholder || '';
        return (
          <span>
            {displayText}
            {selectedCount > 0 && `(${selectedCount})`}
          </span>
        );
      }}
    >
      {(item) => {
        const key = getKey(item);
        const isDisabled = disabledKeys?.has(key) ?? false;
        const isSelected = selectedKeys === 'all' || selectedKeys.has(key);

        return (
          <SelectItem key={key} textValue={getLabel(item)} hideSelectedIcon>
            <div className="flex items-center multiple-select-checkbox">
              <span className="group-data-[disabled=true]:grayscale group-data-[disabled=true]:opacity-40">
                <Checkbox
                  isSelected={isSelected}
                  isDisabled={isDisabled}
                  size="sm"
                  isReadOnly
                  classNames={{
                    wrapper: [
                      'before:!bg-white',
                      'after:bg-primary',
                      'after:text-primary-foreground',
                      'group-data-[selected=true]:after:bg-primary',
                    ],
                    icon: 'text-white',
                  }}
                />
              </span>
              <span className="group-data-[disabled=true]:text-font-non">
                {getLabel(item)}
              </span>
            </div>
          </SelectItem>
        );
      }}
    </Select>
  );
}
