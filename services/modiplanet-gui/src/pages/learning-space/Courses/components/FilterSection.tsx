import { Selection } from '@nextui-org/react';
import SearchInputUI from '@src/components/ui/Input/SearchInputUI';
import MultipleSelectUI from '@src/components/ui/Select/MultipleSelectUI';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import type { CourseFilterFacet } from '@services/gen/gen';

const GRADE_OPTIONS = [
  { value: 'BLOCK', label: 'Block' },
  { value: 'AI_BLOCK', label: 'AI Block' },
];

interface FilterSectionProps {
  editor: Selection;
  level: Selection;
  searchQuery: string;
  filterCourse?: CourseFilterFacet | null;
  onEditorChange: (keys: Selection) => void;
  onLevelChange: (keys: Selection) => void;
  onSearchChange: (query: string) => void;
}

export default function FilterSection({
  editor,
  level,
  searchQuery,
  filterCourse,
  onEditorChange,
  onLevelChange,
  onSearchChange,
}: FilterSectionProps) {
  const { t, i18n } = useTranslation();

  const LEVEL_OPTIONS = useMemo(
    () => [
      { value: 'BEGINNER', label: t('BEGINNER') },
      { value: 'INTERMEDIATE', label: t('INTERMEDIATE') },
      { value: 'ADVANCED', label: t('ADVANCED') },
    ],
    [t],
  );

  const disabledEditorKeys = useMemo(() => {
    if (!filterCourse) return undefined;
    return new Set(
      filterCourse.codingTypes.filter((f) => f.count === 0).map((f) => f.value),
    );
  }, [filterCourse]);

  const disabledLevelKeys = useMemo(() => {
    if (!filterCourse) return undefined;
    return new Set(
      filterCourse.difficulties
        .filter((f) => f.count === 0)
        .map((f) => f.value),
    );
  }, [filterCourse]);

  return (
    <div className="flex items-center justify-between mb-[30px]">
      <div className="flex items-center gap-[12px]">
        <MultipleSelectUI
          items={GRADE_OPTIONS}
          label={t('CODE_EDITOR')}
          placeholder={t('CODE_EDITOR')}
          selectedKeys={editor}
          onSelectionChange={filterCourse ? onEditorChange : () => {}}
          getKey={(item) => item.value}
          getLabel={(item) => item.label}
          disabledKeys={disabledEditorKeys}
          classNames={{
            trigger:
              'bg-white border border-[#DDDDDD] shadow-none w-[180px] h-[46px]',
          }}
        />

        <MultipleSelectUI
          items={LEVEL_OPTIONS}
          label={t('LEVEL')}
          placeholder={t('LEVEL')}
          selectedKeys={level}
          onSelectionChange={filterCourse ? onLevelChange : () => {}}
          getKey={(item) => item.value}
          getLabel={(item) => item.label}
          disabledKeys={disabledLevelKeys}
          classNames={{
            trigger:
              'bg-white border border-[#DDDDDD] shadow-none w-[180px] h-[46px]',
          }}
        />
      </div>

      <SearchInputUI
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={t('SEARCH_COURSE')}
        className="w-[400px]"
        disableSearchButton={true}
        showBorder={true}
      />
    </div>
  );
}
