import useTranslator from '@src/components/hooks/useTranslator';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import SearchInputUI from '@src/components/ui/Input/SearchInputUI';

interface StatusFilterProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
  counts?: {
    all: number;
    ongoing: number;
    complete: number;
  };
  hideSearch?: boolean;
}

export default function StatusFilter({
  currentStatus,
  onStatusChange,
  searchKeyword,
  onSearchChange,
  counts = { all: 0, ongoing: 0, complete: 0 },
  hideSearch = false,
}: StatusFilterProps) {
  const { t } = useTranslator();
  const statuses = [
    { key: 'all', label: t('ALL') },
    { key: 'ongoing', label: t('STUDY_IN_PROGRESS') },
    { key: 'complete', label: t('STUDY_COMPLETED') },
  ];

  return (
    <div className="flex items-center justify-between mb-[24px]">
      <div className="flex gap-[12px]">
        {statuses.map((item) => (
          <ButtonUI
            key={item.key}
            onClick={() => onStatusChange(item.key)}
            disableAnimation
            disableRipple
            className={`p5-sb ${
              currentStatus === item.key
                ? 'bg-brand_4 text-brand'
                : 'bg-form-form text-font-main'
            }`}
          >
            {item.label}({counts[item.key as keyof typeof counts]})
          </ButtonUI>
        ))}
      </div>

      {!hideSearch && (
        <SearchInputUI
          value={searchKeyword}
          onChange={onSearchChange}
          placeholder={t('COURSE_SEARCH_MSG')}
          className="w-[400px]"
          disableSearchButton={true}
          showBorder={true}
        />
      )}
    </div>
  );
}
