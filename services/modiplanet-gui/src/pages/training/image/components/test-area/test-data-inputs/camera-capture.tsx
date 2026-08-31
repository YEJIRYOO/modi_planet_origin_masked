import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useDrawCanvas from '@src/pages/training/image/hooks/useDrawCanvas';
import useTranslator from '@hooks/useTranslator';
import { Flip, Settings } from '@src/lib/newAssets';
import useCameraStream from '@src/pages/training/image/hooks/useCameraStream';
import CameraSelectionPopover from './CameraSelectionPopover';

interface ICameraCapture {
  onPredict: (data: ImageData) => void;
}

function CameraCapture({ onPredict }: ICameraCapture) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  //test
  // const imageRef = useRef<HTMLImageElement | null>(null);
  const [isFlip, setIsFlip] = useState(true);
  const isFlipRef = useRef(isFlip);
  // const throttled = useRef(throttle(updateParticipantMetadata, 2000));
  const FRAME_RATE_FOR_PREDICT = 20;
  const { drawCanvasByVideoCapture } = useDrawCanvas();
  const { t } = useTranslator();

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

  useEffect(() => {
    isFlipRef.current = isFlip;
  }, [isFlip]);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // const image = imageRef.current;
    let animationFrameId: null | number = null;

    const cleanup = (video: HTMLVideoElement) => {
      video.removeEventListener('play', drawFrame);
      video.pause();
      video.srcObject = null;
      animationFrameId && cancelAnimationFrame(animationFrameId);
    };

    // 비디오 프레임을 캔버스에 그리는 함수
    const drawFrame = () => {
      if (!context) return;

      drawCanvasByVideoCapture({
        video,
        canvas,
        isFlip: isFlipRef.current,
      });

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      if (animationFrameId && animationFrameId % FRAME_RATE_FOR_PREDICT === 0) {
        onPredict(imageData);
      }

      animationFrameId = requestAnimationFrame(drawFrame);

      // imageData -> img tag test
      // const imageUrl = imageDataToUrl(imageData);
      // image.src = imageUrl;
    };

    // 비디오 프레임 그리기 시작
    video.addEventListener('play', drawFrame);

    return () => {
      cleanup(video);
    };
  }, []);

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

  // imageData를 Blob URL로 변환하는 함수
  const imageDataToUrl = (imageData) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as any;
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    context.putImageData(imageData, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    return dataUrl;
  };

  return (
    <Fragment>
      <div className="aspect-square w-full mb-[16px] relative">
        {/*<img ref={imageRef} alt="Webcam" className="absolute top-0 right-0" />*/}
        <canvas className="hidden" ref={canvasRef} />
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
    </Fragment>
  );
}

export default CameraCapture;
