import { useState } from 'react';
import { bufferToWave } from './bufferToWave';

const useAudioCropper = (recordingsRef: any) => {
  const cropAudio = async (updatedRegion, recordedUrl) => {
    if (!updatedRegion || !recordedUrl) return null;

    const response = await fetch(recordedUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const startOffset = Math.floor(
      updatedRegion.start * audioBuffer.sampleRate,
    );
    const endOffset = Math.floor(updatedRegion.end * audioBuffer.sampleRate);
    const croppedLength = endOffset - startOffset;
    const croppedBuffer = audioContext.createBuffer(
      audioBuffer.numberOfChannels,
      croppedLength,
      audioBuffer.sampleRate,
    );

    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const originalData = audioBuffer.getChannelData(channel);
      const croppedData = croppedBuffer.getChannelData(channel);
      for (let i = 0; i < croppedLength; i++) {
        croppedData[i] = originalData[i + startOffset];
      }
    }

    const waveArrayBuffer = bufferToWave(croppedBuffer);

    const blob = new Blob([waveArrayBuffer], { type: 'audio/wav' });
    const croppedUrl = URL.createObjectURL(blob);
    return croppedUrl;
  };

  return { cropAudio };
};

export default useAudioCropper;
