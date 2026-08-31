import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ModelMaxAlertModal from '@src/pages/training/components/ModelMaxAlertModal';
import OneButtonModiTypeModal from '@src/pages/training/components/ModiTypeModal/OneButtonModiTypeModal';
import TwoButtonModiTypeModal from '@src/pages/training/components/ModiTypeModal/TwoButtonModiTypeModal';

describe('[트레이닝] 모달', () => {
  test('모델 최대 개수 알림 모달은 안내 문구와 확인 클릭을 처리한다.', () => {
    const onClose = vi.fn();
    const onOK = vi.fn();

    render(<ModelMaxAlertModal onClose={onClose} onOK={onOK} />);

    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(screen.getByText('MODEL_ALERT_MAX_COUNT')).toBeVisible();
    expect(onOK).toHaveBeenCalledTimes(1);
  });

  test('모디 타입 선택 모달은 취소와 선택 클릭을 처리한다.', () => {
    const onClose = vi.fn();
    const onSubmit = vi.fn();

    render(
      <TwoButtonModiTypeModal
        defaultValue="TOF"
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'CANCEL' }));
    userEvent.click(screen.getByRole('button', { name: 'SELECT' }));

    expect(screen.getByRole('heading', { name: 'TRAINING_MODI_MODEL' })).toBeVisible();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('TOF');
  });
});
