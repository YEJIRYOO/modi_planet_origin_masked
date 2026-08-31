import { adjustDrawingSize } from '@src/lib/utils/utils';

type TDrawCanvasFromVideoProps = {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  drawHeight?: number;
  drawWidth?: number;
  isFlip?: boolean;
};

type TDrawCanvasFromFileProps = {
  file: File;
  canvas: HTMLCanvasElement;
  drawHeight?: number;
  drawWidth?: number;
};

const useDrawCanvas = () => {
  const drawCanvasByVideoCapture = ({
    video,
    canvas,
    drawHeight = 160,
    drawWidth = 160,
    isFlip = false,
  }: TDrawCanvasFromVideoProps) => {
    let dx = 0;
    let dy = 0;
    let dWidth = drawWidth;
    let dHeight = drawHeight;

    let drawTarget: HTMLCanvasElement | HTMLVideoElement;

    const videoWidth = video.videoWidth || 100;
    const videoHeight = video.videoHeight || 100;

    const { sWidth, sHeight, sy, sx } = adjustDrawingSize(
      videoWidth,
      videoHeight,
    );

    if (isFlip) {
      const flippedCanvas = document.createElement('canvas');
      const flippedContext = flippedCanvas.getContext('2d');
      flippedCanvas.width = videoWidth;
      flippedCanvas.height = videoHeight;
      flippedContext && flippedContext.scale(-1, 1);
      flippedContext &&
        flippedContext.drawImage(
          video,
          -videoWidth,
          0,
          videoWidth,
          videoHeight,
        );

      drawTarget = flippedCanvas;
    } else {
      drawTarget = video;
    }

    canvas.width = drawWidth;
    canvas.height = drawHeight;

    const context = canvas.getContext('2d');

    context &&
      context.drawImage(
        drawTarget,
        sx,
        sy,
        sWidth,
        sHeight,
        dx,
        dy,
        dWidth,
        dHeight,
      );
  };

  const drawCanvasByImageFile = ({
    canvas,
    file,
    drawHeight = 150,
    drawWidth = 150,
  }: TDrawCanvasFromFileProps): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const context = canvas.getContext('2d');
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();

        let dx = 0;
        let dy = 0;
        let dHeight = drawHeight;
        let dWidth = drawWidth;

        img.onload = () => {
          if (!context) {
            reject(new Error('Canvas context is not available.'));
            return;
          }

          canvas.width = 150;
          canvas.height = 150;

          const imgWidth = img.naturalWidth || 100;
          const imgHeight = img.naturalHeight || 100;

          const { sWidth, sHeight, sx, sy } = adjustDrawingSize(
            imgWidth,
            imgHeight,
          );

          context.drawImage(
            img,
            sx,
            sy,
            sWidth,
            sHeight,
            dx,
            dy,
            dWidth,
            dHeight,
          );

          resolve(true); // All async operations completed successfully.
        };

        img.onerror = () => {
          reject(new Error('Failed to load image.'));
        };

        event.target && (img.src = event.target.result as string);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file.'));
      };

      reader.readAsDataURL(file);
    });
  };

  return {
    drawCanvasByVideoCapture,
    drawCanvasByImageFile,
  };
};

export default useDrawCanvas;
