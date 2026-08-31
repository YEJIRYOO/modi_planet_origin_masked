import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CameraSelectionPopover from '@src/pages/training/image/components/test-area/test-data-inputs/CameraSelectionPopover';

const createCamera = (
  deviceId: string,
  label: string,
): MediaDeviceInfo =>
  ({
    deviceId,
    label,
    kind: 'videoinput',
    groupId: 'group-id',
    toJSON: () => ({}),
  }) as MediaDeviceInfo;

describe('[트레이닝] 카메라 선택 팝오버', () => {
  test('카메라 목록을 열고 카메라 선택 값을 전달한다.', async () => {
    const onSelectCamera = vi.fn();

    render(
      <CameraSelectionPopover
        cameraInfos={[
          createCamera('front', 'Front Camera'),
          createCamera('back', 'Back Camera'),
        ]}
        activeCameraId="front"
        onSelectCamera={onSelectCamera}
      >
        <button>SETTINGS</button>
      </CameraSelectionPopover>,
    );

    userEvent.click(screen.getAllByRole('button', { name: 'SETTINGS' })[0]);
    expect(screen.getByRole('button', { name: 'Front Camera' })).toHaveClass(
      'bg-form-form',
    );

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Back Camera' }));
    });

    expect(onSelectCamera).toHaveBeenCalledWith('back');
  });

  test('카메라가 없으면 팝오버를 열지 않는다.', () => {
    render(
      <CameraSelectionPopover
        cameraInfos={[]}
        activeCameraId=""
        onSelectCamera={vi.fn()}
      >
        <button>SETTINGS</button>
      </CameraSelectionPopover>,
    );

    userEvent.click(screen.getAllByRole('button', { name: 'SETTINGS' })[0]);

    expect(screen.queryByRole('list')).toBeNull();
  });

  test('팝오버 바깥을 클릭하면 목록을 닫는다.', () => {
    render(
      <div>
        <button>OUTSIDE</button>
        <CameraSelectionPopover
          cameraInfos={[createCamera('front', 'Front Camera')]}
          activeCameraId="front"
          onSelectCamera={vi.fn()}
        >
          <button>SETTINGS</button>
        </CameraSelectionPopover>
      </div>,
    );

    userEvent.click(screen.getAllByRole('button', { name: 'SETTINGS' })[0]);
    expect(screen.getByRole('button', { name: 'Front Camera' })).toBeVisible();

    fireEvent.mouseDown(screen.getByRole('button', { name: 'OUTSIDE' }));

    expect(screen.queryByRole('button', { name: 'Front Camera' })).toBeNull();
  });
});
