import { screen } from '@testing-library/react';

import CourseContent from '@src/pages/course/components/CourseContent';

import { createCourseDetail, renderWithCourseRoute } from './courseTestUtils';

describe('[코스 상세] 컨텐츠 영역', () => {
  test('로딩 중이거나 코스 정보가 없으면 로딩 이미지를 표시한다.', () => {
    // Given
    renderWithCourseRoute(
      <CourseContent courseId="course-1" course={null} loading />,
    );

    // Then
    expect(screen.getByAltText('Loading...')).toHaveAttribute(
      'src',
      '/assets/loading/spinner-loading.gif',
    );
  });

  test('코스 정보가 있으면 헤더와 커리큘럼을 함께 표시한다.', () => {
    // Given
    renderWithCourseRoute(
      <CourseContent
        courseId="course-1"
        course={createCourseDetail()}
        loading={false}
      />,
    );

    // Then
    expect(
      screen.getByRole('heading', { name: '블록 코딩 기초' }),
    ).toBeVisible();
    expect(screen.getByText('CURRICULUM')).toBeVisible();
    expect(screen.getByRole('button', { name: '1. 기본 개념' })).toBeVisible();
  });
});
