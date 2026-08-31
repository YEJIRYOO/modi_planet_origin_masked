import { bufferToWave } from '@src/pages/training/voice/components/classfier-card/voice-upload-inputs/bufferToWave';

const readString = (view: DataView, offset: number, length: number) =>
  Array.from({ length }, (_, index) =>
    String.fromCharCode(view.getUint8(offset + index)),
  ).join('');

const createAudioBuffer = ({
  channels,
  length,
  sampleRate,
  data,
}: {
  channels: number;
  length: number;
  sampleRate: number;
  data: number[][];
}) => ({
  numberOfChannels: channels,
  length,
  sampleRate,
  getChannelData: (channel: number) => Float32Array.from(data[channel]),
});

describe('[트레이닝] 음성 버퍼 WAV 변환', () => {
  test('16bit PCM WAV 헤더와 샘플 데이터를 만든다.', () => {
    const buffer = bufferToWave(
      createAudioBuffer({
        channels: 1,
        length: 3,
        sampleRate: 8000,
        data: [[-1, 0, 1]],
      }),
    );
    const view = new DataView(buffer);

    expect(readString(view, 0, 4)).toBe('RIFF');
    expect(readString(view, 8, 4)).toBe('WAVE');
    expect(readString(view, 36, 4)).toBe('data');
    expect(view.getUint16(22, true)).toBe(1);
    expect(view.getUint32(24, true)).toBe(8000);
    expect(view.getUint16(34, true)).toBe(16);
    expect(view.getInt16(44, true)).toBe(-32768);
    expect(view.getInt16(48, true)).toBe(32767);
  });

  test('24bit와 32bit PCM 데이터도 기록한다.', () => {
    const audioBuffer = createAudioBuffer({
      channels: 2,
      length: 1,
      sampleRate: 44100,
      data: [[0.5], [-0.5]],
    });

    const buffer24 = bufferToWave(audioBuffer, 24);
    const view24 = new DataView(buffer24);
    const buffer32 = bufferToWave(audioBuffer, 32);
    const view32 = new DataView(buffer32);

    expect(view24.getUint16(22, true)).toBe(2);
    expect(view24.getUint16(34, true)).toBe(24);
    expect(view24.byteLength).toBe(50);
    expect(view32.getUint16(34, true)).toBe(32);
    expect(view32.getInt32(44, true)).toBeGreaterThan(0);
    expect(view32.getInt32(48, true)).toBeLessThan(0);
  });
});
