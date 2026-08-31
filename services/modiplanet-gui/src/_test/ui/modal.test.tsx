import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import CModalTwoButton from '@src/components/ui/Modal/CModalTwoButton';

describe('[공통 UI] 모달 버튼', () => {
  test('한 개 버튼 모달에서 확인 버튼을 클릭하면 확인 함수를 실행한다.', () => {
    // Given
    const onClickOk = vi.fn();

    render(
      <CModalOneButton isOpen onClickOk={onClickOk}>
        MODAL_CONTENT
      </CModalOneButton>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(screen.getByText('MODAL_CONTENT')).toBeVisible();
    expect(onClickOk).toHaveBeenCalledTimes(1);
  });

  test('한 개 버튼 모달에서 제목과 커스텀 확인 라벨을 사용할 수 있다.', () => {
    // Given
    const onClickOk = vi.fn();

    render(
      <CModalOneButton
        isOpen
        title="MODAL_TITLE"
        subTitle="MODAL_SUBTITLE"
        okLabel="GO_HOME"
        onClickOk={onClickOk}
      >
        MODAL_CONTENT
      </CModalOneButton>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'GO_HOME' }));

    // Then
    expect(screen.getByRole('heading', { name: 'MODAL_TITLE' })).toBeVisible();
    expect(screen.getByText('MODAL_SUBTITLE')).toBeVisible();
    expect(onClickOk).toHaveBeenCalledTimes(1);
  });

  test('한 개 버튼 모달에서 버튼이 비활성화되면 확인 함수를 실행하지 않는다.', () => {
    // Given
    const onClickOk = vi.fn();

    render(
      <CModalOneButton isOpen onClickOk={onClickOk} isDisabled>
        MODAL_CONTENT
      </CModalOneButton>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(onClickOk).not.toHaveBeenCalled();
  });

  test('두 개 버튼 모달에서 커스텀 버튼 라벨을 사용할 수 있다.', () => {
    // Given
    const onClickCancel = vi.fn();
    const onClickOk = vi.fn();

    render(
      <CModalTwoButton
        isOpen
        cancelLabel="NO"
        okLabel="YES"
        onClickCancel={onClickCancel}
        onClickOk={onClickOk}
      >
        MODAL_CONTENT
      </CModalTwoButton>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'NO' }));
    userEvent.click(screen.getByRole('button', { name: 'YES' }));

    // Then
    expect(onClickCancel).toHaveBeenCalledTimes(1);
    expect(onClickOk).toHaveBeenCalledTimes(1);
  });

  test('두 개 버튼 모달에서 취소와 확인 버튼 클릭을 각각 처리한다.', () => {
    // Given
    const onClickCancel = vi.fn();
    const onClickOk = vi.fn();

    render(
      <CModalTwoButton
        isOpen
        onClickCancel={onClickCancel}
        onClickOk={onClickOk}
      >
        MODAL_CONTENT
      </CModalTwoButton>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'CANCEL' }));
    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(onClickCancel).toHaveBeenCalledTimes(1);
    expect(onClickOk).toHaveBeenCalledTimes(1);
  });

  test('두 개 버튼 모달에서 버튼이 비활성화되면 클릭 함수를 실행하지 않는다.', () => {
    // Given
    const onClickCancel = vi.fn();
    const onClickOk = vi.fn();

    render(
      <CModalTwoButton
        isOpen
        onClickCancel={onClickCancel}
        onClickOk={onClickOk}
        isDisabledCancel
        isDisabledOk
      >
        MODAL_CONTENT
      </CModalTwoButton>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'CANCEL' }));
    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(onClickCancel).not.toHaveBeenCalled();
    expect(onClickOk).not.toHaveBeenCalled();
  });
});
