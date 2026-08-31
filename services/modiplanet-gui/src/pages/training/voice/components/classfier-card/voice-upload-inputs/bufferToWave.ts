export const bufferToWave = (audioBuffer, bitDepth = 16) => {
  const numOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;
  const sampleRate = audioBuffer.sampleRate;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numOfChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const buffer = new ArrayBuffer(44 + length * numOfChannels * bytesPerSample);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + length * numOfChannels * bytesPerSample, true);
  writeString(view, 8, 'WAVE');
  // FMT sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true); // byte rate
  view.setUint16(32, blockAlign, true); // block align
  view.setUint16(34, bitDepth, true); // bits per sample
  // Data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, length * numOfChannels * bytesPerSample, true);

  // Write PCM samples
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numOfChannels; channel++) {
      let sample = audioBuffer.getChannelData(channel)[i];
      sample = Math.max(-1, Math.min(1, sample));
      if (bitDepth === 16) {
        view.setInt16(
          offset,
          sample < 0 ? sample * 0x8000 : sample * 0x7fff,
          true,
        );
      } else if (bitDepth === 24) {
        let s = sample < 0 ? sample * 0x800000 : sample * 0x7fffff;
        view.setUint8(offset, s & 0xff);
        view.setUint8(offset + 1, (s >> 8) & 0xff);
        view.setUint8(offset + 2, (s >> 16) & 0xff);
      } else if (bitDepth === 32) {
        view.setInt32(
          offset,
          sample < 0 ? sample * 0x80000000 : sample * 0x7fffffff,
          true,
        );
      }
      offset += bytesPerSample;
    }
  }

  return buffer;
};

const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};
