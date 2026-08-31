import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ImageUploadButtons from '@src/pages/training/image/components/classfier-card/image-upload-buttons';
import ModiUploadButtons from '@src/pages/training/modi/components/ClassfierCard/ModiUploadButtons';
import VoiceUploadButtons from '@src/pages/training/voice/components/classfier-card/voice-upload-buttons';

describe('[트레이닝] 데이터 업로드 버튼', () => {
  test('이미지 업로드 버튼은 파일과 카메라 클릭을 전달하고 선택 스타일을 적용한다.', () => {
    const onClickFile = vi.fn();
    const onClickCamera = vi.fn();

    render(
      <ImageUploadButtons
        uploadWay="file"
        onClickFile={onClickFile}
        onClickCamera={onClickCamera}
      />,
    );

    const [fileButton, cameraButton] = screen.getAllByRole('button');
    userEvent.click(fileButton);
    userEvent.click(cameraButton);

    expect(fileButton).toHaveClass('bg-brand');
    expect(cameraButton).toHaveClass('bg-form-form');
    expect(onClickFile).toHaveBeenCalledTimes(1);
    expect(onClickCamera).toHaveBeenCalledTimes(1);
  });

  test('모디 업로드 버튼은 비활성화되면 클릭을 전달하지 않는다.', () => {
    const onClickFile = vi.fn();
    const onClickCamera = vi.fn();

    render(
      <ModiUploadButtons
        uploadWay="live"
        onClickFile={onClickFile}
        onClickCamera={onClickCamera}
        isEnabledTest={false}
      />,
    );

    screen.getAllByRole('button').forEach((button) => {
      userEvent.click(button);
      expect(button).toBeDisabled();
    });
    expect(onClickFile).not.toHaveBeenCalled();
    expect(onClickCamera).not.toHaveBeenCalled();
  });

  test('음성 업로드 버튼은 파일과 마이크 클릭을 전달하고 선택 스타일을 적용한다.', () => {
    const onClickFile = vi.fn();
    const onClickMic = vi.fn();

    render(
      <VoiceUploadButtons
        uploadWay="mic"
        onClickFile={onClickFile}
        onClickMic={onClickMic}
      />,
    );

    const [fileButton, micButton] = screen.getAllByRole('button');
    userEvent.click(fileButton);
    userEvent.click(micButton);

    expect(fileButton).toHaveClass('bg-form-form');
    expect(micButton).toHaveClass('bg-brand');
    expect(onClickFile).toHaveBeenCalledTimes(1);
    expect(onClickMic).toHaveBeenCalledTimes(1);
  });
});
