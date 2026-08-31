import useTranslator from '@src/components/hooks/useTranslator';
import ChipUI from '@src/components/ui/Chip/ChipUI';

export type CourseStatusType = 'not_started' | 'ongoing' | 'complete';

interface CourseStatusProps {
  status: CourseStatusType;
}

export default function CourseStatus({ status }: CourseStatusProps) {
  const { t } = useTranslator();

  const getStatusConfig = () => {
    switch (status) {
      case 'not_started':
        return {
          label: t('BEFORE_STUDY'),
          color: 'gray' as const,
        };
      case 'ongoing':
        return {
          label: t('STUDY_IN_PROGRESS'),
          color: 'yellow' as const,
        };
      case 'complete':
        return {
          label: t('STUDY_COMPLETED'),
          color: 'green' as const,
        };
      default:
        return {
          label: t('BEFORE_STUDY'),
          color: 'gray' as const,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <ChipUI color={config.color} variant="filled" size="xl">
      {config.label}
    </ChipUI>
  );
}
