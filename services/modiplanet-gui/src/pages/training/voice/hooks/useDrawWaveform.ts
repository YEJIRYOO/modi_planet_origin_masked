import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugins/spectrogram.js';
import createColormap from 'colormap';

const colors = createColormap({
  colormap: 'jet',
  nshades: 256,
  format: 'float',
});

// AudioContext.close()가 이미 닫힌 컨텍스트에서 호출되면 에러 발생 방지
const _origClose = AudioContext.prototype.close;
AudioContext.prototype.close = function () {
  if (this.state === 'closed') return Promise.resolve();
  return _origClose.call(this);
};

const getImageUrlFromWaveSurfer = async (url: string): Promise<ImageData> => {
  return new Promise((res, rej) => {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.width = '224px';
    container.style.height = '224px';
    document.body.appendChild(container);

    const spectrogramPlugin = SpectrogramPlugin.create({
      colorMap: colors,
      height: 224,
    });

    const waveSurfer = WaveSurfer.create({
      container,
      height: 0,
      sampleRate: 44100,
      plugins: [spectrogramPlugin],
    });

    spectrogramPlugin.on('ready', () => {
      setTimeout(() => {
        try {
          // v7: canvases는 plugin.wrapper > canvasContainer 안에 생성됨
          // container.querySelector('canvas')는 waveform 캔버스(빈 데이터)를 찾으므로
          // plugin 내부의 canvasContainer에서 직접 접근
          const spectrogramCanvas: HTMLCanvasElement | null =
            (spectrogramPlugin as any).canvases?.[0] ??
            (spectrogramPlugin as any).canvasContainer?.querySelector('canvas');

          if (!spectrogramCanvas) {
            throw new Error('Spectrogram canvas not found');
          }

          const context = spectrogramCanvas.getContext('2d', {
            willReadFrequently: true,
          });
          if (!context) {
            throw new Error('Could not get canvas 2d context');
          }

          const imageData = context.getImageData(0, 0, 224, 224);
          res(imageData);
        } catch (error) {
          rej(error);
        } finally {
          waveSurfer.destroy();
          container.remove();
        }
      }, 0);
    });

    waveSurfer.load(url);
  });
};

const useDrawWaveform = () => {
  return {
    getImageUrlFromWaveSurfer,
  };
};

export default useDrawWaveform;
