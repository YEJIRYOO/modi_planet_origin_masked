import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Content from '@src/pages/course/learning/components/content';
import CodingContent from '@src/pages/course/learning/components/content/coding';
import DocumentLoadingOverlay from '@src/pages/course/learning/components/content/document/common/DocumentLoadingOverlay';
import NoContent from '@src/pages/course/learning/components/content/error/NoContent';
import { ActivityCodingType } from '@src/services/gen/gen';

const defaultContentProps = {
  stepId: 'step-1',
  onPrevStep: vi.fn(),
  onNextStep: vi.fn(),
  hasPrevStep: true,
  hasNextStep: true,
  onToggleFullscreen: vi.fn(),
  isFullscreen: false,
};

describe('[학습 페이지] 컨텐츠 공통', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('문서 로딩 오버레이는 진행률과 실패 상태를 표시한다.', () => {
    // Given
    const { rerender } = render(
      <DocumentLoadingOverlay loadingProgress={42} showProgress />,
    );

    // Then
    expect(screen.getByAltText('Loading')).toHaveAttribute(
      'src',
      '/assets/course/curriculum/loading.gif',
    );
    expect(screen.getByText('LESSON_LOADING')).toBeVisible();
    expect(screen.getByText('42%')).toBeVisible();

    // When
    rerender(<DocumentLoadingOverlay hasError showProgress />);

    // Then
    expect(screen.getByAltText('Loading Failed')).toHaveAttribute(
      'src',
      '/assets/course/curriculum/loading-failed.svg',
    );
    expect(screen.getByText('LESSON_LOAD_ERROR')).toBeVisible();
    expect(screen.queryByText('42%')).toBeNull();
  });

  test('자료가 없는 차시는 안내와 이전/다음 차시 버튼을 표시한다.', () => {
    // Given
    const onPrevLesson = vi.fn();
    const onNextLesson = vi.fn();

    render(
      <NoContent
        hasPrevLesson
        hasNextLesson
        onPrevLesson={onPrevLesson}
        onNextLesson={onNextLesson}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'PREV_LESSON' }));
    userEvent.click(screen.getByRole('button', { name: 'NEXT_LESSON' }));

    // Then
    expect(screen.getByAltText('no data')).toBeVisible();
    expect(screen.getByText('NO_MATERIAL')).toBeVisible();
    expect(onPrevLesson).toHaveBeenCalledTimes(1);
    expect(onNextLesson).toHaveBeenCalledTimes(1);
  });

  test('코딩 컨텐츠는 목표와 활동을 표시하고 에디터 iframe 주소를 만든다.', () => {
    // Given
    render(
      <CodingContent
        {...defaultContentProps}
        learningObjective="<p>반복문을 이해한다.</p>"
        activity="<p>블록으로 반복 실행하기</p>"
        codeEditorType={ActivityCodingType.AiBlock}
      />,
    );

    // Then
    expect(screen.getByText('PRACTICE')).toBeVisible();
    expect(screen.getByText('반복문을 이해한다.')).toBeVisible();
    expect(screen.getByText('블록으로 반복 실행하기')).toBeVisible();
    expect(document.querySelector('iframe')).toHaveAttribute(
      'src',
      expect.stringContaining('mode=ai'),
    );
    expect(document.querySelector('iframe')).toHaveAttribute(
      'src',
      expect.stringContaining('locale=ko'),
    );
  });

  test('코딩 컨텐츠는 빈 HTML 문단을 렌더링하지 않고 기본 block 모드를 사용한다.', () => {
    // Given
    render(
      <CodingContent
        {...defaultContentProps}
        learningObjective="<p><br /></p>"
        activity="<p>활동만 표시</p>"
      />,
    );

    // Then
    expect(screen.queryByText('반복문을 이해한다.')).toBeNull();
    expect(screen.getByText('활동만 표시')).toBeVisible();
    expect(document.querySelector('iframe')).toHaveAttribute(
      'src',
      expect.stringContaining('mode=block'),
    );
  });

  test('코딩 컨텐츠는 힌트/정답 블록을 접고 펼칠 수 있게 변환한다.', () => {
    // Given
    render(
      <CodingContent
        {...defaultContentProps}
        learningObjective={`
          <div data-hint-answer>
            <div data-hint-content>반복 횟수를 살펴보세요.</div>
            <div data-answer-content>repeat 블록을 사용합니다.</div>
          </div>
        `}
        activity=""
      />,
    );

    const hintHeader = screen.getByText('힌트 확인하기');
    const answerHeader = screen.getByText('정답 확인하기');

    // When
    fireEvent.click(hintHeader);
    fireEvent.click(answerHeader);

    // Then
    expect(screen.getByText('반복 횟수를 살펴보세요.')).toBeVisible();
    expect(screen.getByText('repeat 블록을 사용합니다.')).toBeVisible();
    expect(document.querySelector('.hint-body')).toHaveClass('open');
    expect(document.querySelector('.answer-body')).toHaveClass('open');
  });

  test('코딩 컨텐츠는 드래그로 설명 패널 너비를 조절한다.', () => {
    // Given
    render(
      <CodingContent
        {...defaultContentProps}
        learningObjective="<p>목표</p>"
        activity="<p>활동</p>"
      />,
    );

    const container = document.querySelector('.bg-white.flex-shrink-0')
      ?.parentElement as HTMLElement;
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      width: 1000,
      right: 1000,
      top: 0,
      bottom: 500,
      height: 500,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    const resizeHandle = container.children[1];

    // When
    fireEvent.mouseDown(resizeHandle, { clientX: 300 });
    fireEvent.mouseMove(document, { clientX: 650 });
    fireEvent.mouseUp(document);

    // Then
    expect(container.firstElementChild).toHaveStyle({ width: '650px' });
  });

  test('Content는 타입에 맞는 코딩 컨텐츠와 미지원 타입 안내를 렌더링한다.', () => {
    // Given
    const { rerender } = render(
      <Content
        {...defaultContentProps}
        contentType="CODING"
        learningObjective="<p>목표</p>"
        activity="<p>활동</p>"
        codeEditorType={ActivityCodingType.Block}
      />,
    );

    // Then
    expect(screen.getByText('목표')).toBeVisible();
    expect(screen.getByText('활동')).toBeVisible();

    // When
    rerender(
      <Content {...defaultContentProps} contentType={'UNKNOWN' as 'CODING'} />,
    );

    // Then
    expect(screen.getByText(/지원하지 않는 컨텐츠 형식입니다/)).toBeVisible();
  });
});
