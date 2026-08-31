import {
  getCourseBanner,
  getCourseThumbnail,
  isLightThumbnail,
} from '@src/lib/utils/courseThumbnail';
import {
  ActivityCodingType,
  CourseDifficulty,
} from '@src/services/gen/gen';

describe('[유틸] 코스 썸네일', () => {
  test('난이도에 맞는 기본 썸네일 경로를 반환한다.', () => {
    expect(getCourseThumbnail(CourseDifficulty.Beginner)).toBe(
      '/assets/course/beginner-thumbnail.png',
    );
    expect(getCourseThumbnail(CourseDifficulty.Intermediate)).toBe(
      '/assets/course/intermediate-thumbnail.png',
    );
    expect(getCourseThumbnail(CourseDifficulty.Advanced)).toBe(
      '/assets/course/advanced-thumbnail.png',
    );
  });

  test('AI 블록 코스는 난이도보다 AI 전용 썸네일을 우선한다.', () => {
    expect(
      getCourseThumbnail(CourseDifficulty.Advanced, ActivityCodingType.AiBlock),
    ).toBe('/assets/course/ai-thumbnail.png');
  });

  test('배너도 썸네일과 같은 우선순위로 경로를 반환한다.', () => {
    expect(getCourseBanner(CourseDifficulty.Intermediate)).toBe(
      '/assets/course/intermediate-banner.png',
    );
    expect(
      getCourseBanner(CourseDifficulty.Beginner, ActivityCodingType.AiBlock),
    ).toBe('/assets/course/ai-banner.png');
  });

  test('AI 블록과 고급 코스는 밝은 썸네일로 판단한다.', () => {
    expect(isLightThumbnail(CourseDifficulty.Beginner)).toBe(false);
    expect(isLightThumbnail(CourseDifficulty.Advanced)).toBe(true);
    expect(
      isLightThumbnail(CourseDifficulty.Beginner, ActivityCodingType.AiBlock),
    ).toBe(true);
  });
});
