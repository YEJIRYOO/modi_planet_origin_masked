import SearchInputUI from '@src/components/ui/Input/SearchInputUI';
import useTranslator from '@src/components/hooks/useTranslator';

interface ProjectSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProjectSearchInput({
  value,
  onChange,
}: ProjectSearchInputProps) {
  const { t } = useTranslator();

  return (
    <SearchInputUI
      value={value}
      onChange={onChange}
      placeholder={t('SEARCH_PROJECT')}
      className="w-[404px] sm:w-[218px]"
      disableSearchButton={true}
    />
  );
}
