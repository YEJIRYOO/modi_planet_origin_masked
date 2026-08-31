import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_VIDEO_RESOLUTION } from '@src/lib/constants/etc';

const getCameraConstraints = (deviceId?: string): MediaStreamConstraints => ({
  audio: false,
  video: deviceId
    ? {
        ...DEFAULT_VIDEO_RESOLUTION,
        deviceId: { exact: deviceId },
      }
    : DEFAULT_VIDEO_RESOLUTION,
});

const stopStream = (stream: MediaStream | null) => {
  stream?.getTracks().forEach((track) => track.stop());
};

const getVideoTrack = (stream: MediaStream | null) =>
  stream?.getVideoTracks()[0] ?? null;

const canUseMediaDevices = () =>
  typeof navigator !== 'undefined' &&
  !!navigator.mediaDevices?.getUserMedia &&
  !!navigator.mediaDevices?.enumerateDevices;

const requestCameraStream = (deviceId?: string) =>
  navigator.mediaDevices.getUserMedia(getCameraConstraints(deviceId));

type TUseCameraStreamOptions = {
  onCameraError?: (error: unknown) => void;
};

const useCameraStream = (
  videoRef: RefObject<HTMLVideoElement | null>,
  options?: TUseCameraStreamOptions,
) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasCameraAccessError, setHasCameraAccessError] = useState(false);
  const [cameraInfos, setCameraInfos] = useState<MediaDeviceInfo[]>([]);
  const [activeCameraId, setActiveCameraId] = useState('');

  const streamRef = useRef<MediaStream | null>(null);
  const isMountedRef = useRef(false);
  const onCameraErrorRef = useRef(options?.onCameraError);

  useEffect(() => {
    onCameraErrorRef.current = options?.onCameraError;
  }, [options?.onCameraError]);

  const updateActiveCamera = useCallback(
    (stream: MediaStream | null, cameras: MediaDeviceInfo[] = []) => {
      const track = getVideoTrack(stream);
      const deviceId = track?.getSettings().deviceId;
      const matchedCamera = cameras.find(
        (camera) => !!camera.label && camera.label === track?.label,
      );

      if (!isMountedRef.current) return;

      setActiveCameraId(deviceId || matchedCamera?.deviceId || '');
    },
    [],
  );

  const detachVideo = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.srcObject = null;
    video.onloadedmetadata = null;
  }, [videoRef]);

  const refreshCameraInfos = useCallback(
    async (stream: MediaStream | null = streamRef.current) => {
      if (!canUseMediaDevices()) return [];

      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(
        (device) => device.kind === 'videoinput' && !!device.deviceId,
      );

      if (!isMountedRef.current) return cameras;

      setCameraInfos(cameras);
      updateActiveCamera(stream, cameras);

      return cameras;
    },
    [updateActiveCamera],
  );

  const attachStream = useCallback(
    async (stream: MediaStream) => {
      const video = videoRef.current;

      if (!video || !isMountedRef.current) {
        stopStream(stream);
        return;
      }

      streamRef.current = stream;
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        if (!isMountedRef.current) return;

        setIsVideoReady(true);
      };

      updateActiveCamera(stream);

      if (isMountedRef.current && video.readyState >= 1) {
        setIsVideoReady(true);
      }

      try {
        await video.play();
      } catch (error) {
        console.error('@@camera play err', error);
      }
    },
    [updateActiveCamera, videoRef],
  );

  const startCamera = useCallback(async () => {
    if (!canUseMediaDevices()) {
      throw new Error('MediaDevices API is not available.');
    }

    setHasCameraAccessError(false);
    setIsVideoReady(false);

    const stream = await requestCameraStream();

    await attachStream(stream);
    await refreshCameraInfos(stream);
  }, [attachStream, refreshCameraInfos]);

  const selectCamera = useCallback(
    async (deviceId: string) => {
      if (!deviceId || deviceId === activeCameraId) return;

      const previousStream = streamRef.current;
      const previousCameraId = activeCameraId;

      setHasCameraAccessError(false);
      setIsVideoReady(false);
      stopStream(previousStream);
      streamRef.current = null;
      detachVideo();

      try {
        const stream = await requestCameraStream(deviceId);

        await attachStream(stream);
        if (!isMountedRef.current) return;

        setActiveCameraId(deviceId);
        await refreshCameraInfos(stream);
      } catch (error) {
        if (!isMountedRef.current) throw error;

        try {
          const restoredStream = await requestCameraStream(previousCameraId);

          await attachStream(restoredStream);
          await refreshCameraInfos(restoredStream);
        } catch (restoreError) {
          console.error('@@restore camera err', restoreError);
          setHasCameraAccessError(true);
        }

        throw error;
      }
    },
    [activeCameraId, attachStream, detachVideo, refreshCameraInfos],
  );

  useEffect(() => {
    isMountedRef.current = true;

    startCamera().catch((error) => {
      if (!isMountedRef.current) return;

      console.error('@@camera err', error);
      setHasCameraAccessError(true);
      onCameraErrorRef.current?.(error);
    });

    const handleDeviceChange = () => {
      refreshCameraInfos().catch((error) => {
        console.error('@@setDeviceInfos err', error);
      });
    };

    const mediaDevices =
      typeof navigator !== 'undefined' ? navigator.mediaDevices : undefined;

    mediaDevices?.addEventListener?.('devicechange', handleDeviceChange);

    return () => {
      isMountedRef.current = false;

      mediaDevices?.removeEventListener?.('devicechange', handleDeviceChange);

      stopStream(streamRef.current);
      streamRef.current = null;
      detachVideo();
    };
  }, [detachVideo, refreshCameraInfos, startCamera]);

  return {
    isVideoReady,
    hasCameraAccessError,
    cameraInfos,
    activeCameraId,
    selectCamera,
    refreshCameraInfos,
  };
};

export default useCameraStream;
