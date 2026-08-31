import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CurriculumSidebar from '@src/pages/course/components/CurriculumSidebar';

import { createCourseDetail, renderWithCourseRoute } from './courseTestUtils';

describe('[코스 상세] 커리큘럼 사이드바', () => {
  test('코스 정보와 커리큘럼 메뉴를 표시한다.', () => {
    // Given
    renderWithCourseRoute(<CurriculumSidebar course={createCourseDetail()} />);

    // Then
    expect(screen.getByText('COURSE')).toBeVisible();
    expect(screen.getByText('블록 코딩 기초')).toBeVisible();
    expect(screen.getByText('COURSE_PERIOD')).toBeVisible();
    expect(screen.getByText('UNLIMITED')).toBeVisible();
    expect(screen.getByRole('button', { name: 'CURRICULUM' })).toBeVisible();
  });

  test('이전 화면 정보가 있으면 나가기 버튼으로 해당 경로로 이동한다.', () => {
    // Given
    renderWithCourseRoute(<CurriculumSidebar course={createCourseDetail()} />, {
      initialEntries: [
        {
          pathname: '/course-group/group-1/course/course-1',
          state: { from: '/learning-space/my-course' },
        },
      ],
    });

    // When
    userEvent.click(screen.getByRole('button', { name: 'EXIT' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/learning-space/my-course',
    );
  });
});
