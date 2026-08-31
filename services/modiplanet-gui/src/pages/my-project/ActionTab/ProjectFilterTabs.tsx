import { ProjectRunType } from '@services/gen/gen';
import useTranslator from '@src/components/hooks/useTranslator';

interface ProjectFilterTabsProps {
  selectedRunType: ProjectRunType | null;
  onRunTypeChange: (runType: ProjectRunType | null) => void;
}

const runTypeOptions = [
  { value: 'ALL', labelKey: 'VIEW_ALL' },
  { value: ProjectRunType.Realtime, labelKey: 'AI_BLOCK' },
  { value: ProjectRunType.Upload, labelKey: 'BLOCK' },
];

export default function ProjectFilterTabs({
  selectedRunType,
  onRunTypeChange,
}: ProjectFilterTabsProps) {
  const { t } = useTranslator();

  return (
    <div className="flex gap-8 items-center relative">
      {runTypeOptions.map((option) => {
        const isActive =
          (option.value === 'ALL' && !selectedRunType) ||
          option.value === selectedRunType;

        return (
          <button
            key={option.value}
            onClick={() => {
              if (option.value === 'ALL') {
                onRunTypeChange(null);
              } else {
                onRunTypeChange(option.value as ProjectRunType);
              }
            }}
            className={`relative pb-[20px] sm:pb-[27px] sm:pb-5 transition-colors whitespace-nowrap p1-b ${
              isActive ? 'text-brand' : 'text-font-non hover:text-[#666666]'
            }`}
          >
            {t(option.labelKey)}
            {isActive && (
              <div className="absolute left-0 right-0 h-[3px] bg-brand bottom-[-2px] z-10" />
            )}
          </button>
        );
      })}
    </div>
  );
}
