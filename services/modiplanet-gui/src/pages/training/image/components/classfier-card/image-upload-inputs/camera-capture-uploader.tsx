import React, { Fragment, useCallback, useRef, useState } from 'react';
import Button from '@components/ui_old/button/button';
import { getUuid } from '@src/lib/utils/utils';
import useDrawCanvas from '@src/pages/training/image/hooks/useDrawCanvas';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import useTranslator from '@hooks/useTranslator';
import { useSingleFileUploader } from '@hooks/upload/useSingleFileUploader';
import { useProfileStore } from '@src/store/zustand';
import { Flip, Settings } from '@src/lib/newAssets';
import useCameraStream from '@src/pages/training/image/hooks/useCameraStream';
import CameraSelectionPopover from '../../test-area/test-data-inputs/CameraSelectionPopover';

interface ICameraCaptureUploader {
  addImageUrls: (urls: Array<string>) => void;
  isDatasetMaxCount: boolean;
}

function CameraCaptureUploader({
  addImageUrls,
  isDatasetMaxCount,
}: ICameraCaptureUploader) {
  const [isFlip, setIsFlip] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { drawCanvasByVideoCapture } = useDrawCanvas();
  const { t } = useTranslator();
  const { onUploadSingleFile } = useSingleFileUploader();
  const profile = useProfileStore((state) => state.profile);

  const showCameraErrorAlert = useCallback(
    (error: unknown) => {
      const errorName = error instanceof Error ? error.name : '';

      if (
        errorName === 'NotAllowedError' ||
        errorName === 'PermissionDeniedError'
      ) {
        alert(
          `${t('CHANGE_CAMERA_PERMISSION')}\n\n${t(
            'CHANGE_CAMERA_PERMISSION_DESC',
          )}`,
        );
        return;
      }

      alert(`${t('CAMERA_UNAVAILABLE')}`);
    },
    [t],
  );

  const {
    isVideoReady,
    hasCameraAccessError,
    cameraInfos,
    activeCameraId,
    selectCamera,
    refreshCameraInfos,
  } = useCameraStream(videoRef, {
    onCameraError: showCameraErrorAlert,
  });

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    try {
      await onUploadSingleFile({
        file: file,
        userId: profile?.userId || '',
        onCompleted: (result) => {
          setIsLoading(false);
          addImageUrls([result.fileUrl]);
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectCamera = useCallback(
    async (deviceId: string) => {
      try {
        await selectCamera(deviceId);
      } catch (error) {
        console.error('@@select camera err', error);
        alert(`${t('CAMERA_UNAVAILABLE')}`);
        refreshCameraInfos().catch((err) => {
          console.error('@@setDeviceInfos err', err);
        });
      }
    },
    [refreshCameraInfos, selectCamera, t],
  );

  const onClickCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    drawCanvasByVideoCapture({
      video: videoRef.current,
      canvas: canvasRef.current,
      drawHeight: 70,
      drawWidth: 70,
      isFlip,
    });

    try {
      const getImageFileFromCanvas = (
        canvas: HTMLCanvasElement,
      ): Promise<File> => {
        return new Promise((resolve) => {
          canvas.toBlob(
            (blob) => {
              const uuid = getUuid();
              if (!blob) return;

              resolve(
                new File([blob], `image-train-${uuid}.jpg`, {
                  type: 'image/jpeg',
                }),
              );
            },
            'image/jpeg',
            0.9,
          );
        });
      };

      const file = await getImageFileFromCanvas(canvasRef.current);

      await uploadFile(file);
    } catch (err) {
      console.log('@@capture err', err);
    }
  };

  return (
    <Fragment>
      <div className="aspect-square w-full mb-[16px] relative">
        <div className="absolute inset-0 overflow-hidden rounded-20">
          <video
            style={{ transform: isFlip ? 'rotateY(180deg)' : '' }}
            className="object-cover w-full h-full"
            ref={videoRef}
            autoPlay
            muted
            playsInline
          />
          {hasCameraAccessError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black opacity-70">
              <p className="p6-m text-center whitespace-pre-wrap text-white">
                {t('REQUIRE_CAMERA')}
              </p>
            </div>
          )}
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-black/30 flex-center">
              <SpinnerLoader className="w-[90px] h-[90px]" />
            </div>
          )}
        </div>
        {isVideoReady && (
          <div className="absolute top-[8px] right-[8.5px] flex gap-2 z-20">
            <button
              onClick={() => setIsFlip(!isFlip)}
              className="w-[32px] h-[32px] flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity cursor-pointer bg-[#00000033]"
            >
              <Flip className="w-6 h-6 brightness-0 invert" />
            </button>
            <CameraSelectionPopover
              cameraInfos={cameraInfos}
              activeCameraId={activeCameraId}
              onSelectCamera={onSelectCamera}
            >
              <button className="w-[32px] h-[32px] flex items-center justify-center rounded-lg hover:opacity-80 transition-opacity cursor-pointer bg-[#00000033]">
                <Settings className="w-6 h-6 brightness-0 invert" />
              </button>
            </CameraSelectionPopover>
          </div>
        )}
      </div>

      <canvas className="hidden" ref={canvasRef} />

      <Button
        onClick={onClickCapture}
        className="w-full"
        color="primary"
        disabled={isLoading || !isDatasetMaxCount || hasCameraAccessError}
      >
        {t('SHOOTING')}
      </Button>
    </Fragment>
  );
}

export default CameraCaptureUploader;
