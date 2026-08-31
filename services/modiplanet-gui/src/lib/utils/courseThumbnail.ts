import { ActivityCodingType, CourseDifficulty } from '@services/gen/gen';

function getCourseAsset(
  difficulty?: CourseDifficulty | null,
  codeEditorType?: ActivityCodingType | null,
  type: 'thumbnail' | 'banner' = 'thumbnail',
): string {
  if (codeEditorType === ActivityCodingType.AiBlock) {
    return `/assets/course/ai-${type}.png`;
  }

  switch (difficulty) {
    case CourseDifficulty.Intermediate:
      return `/assets/course/intermediate-${type}.png`;
    case CourseDifficulty.Advanced:
      return `/assets/course/advanced-${type}.png`;
    case CourseDifficulty.Beginner:
    default:
      return `/assets/course/beginner-${type}.png`;
  }
}

export function getCourseThumbnail(
  difficulty?: CourseDifficulty | null,
  codeEditorType?: ActivityCodingType | null,
): string {
  return getCourseAsset(difficulty, codeEditorType, 'thumbnail');
}

export function isLightThumbnail(
  difficulty?: CourseDifficulty | null,
  codeEditorType?: ActivityCodingType | null,
): boolean {
  return (
    codeEditorType === ActivityCodingType.AiBlock ||
    difficulty === CourseDifficulty.Advanced
  );
}

export function getCourseBanner(
  difficulty?: CourseDifficulty | null,
  codeEditorType?: ActivityCodingType | null,
): string {
  return getCourseAsset(difficulty, codeEditorType, 'banner');
}
