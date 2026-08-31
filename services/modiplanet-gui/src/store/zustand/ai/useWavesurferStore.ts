import create from 'zustand';
import WaveSurfer from 'wavesurfer.js';
import _ from 'lodash';

type TWaveSurferState = {
  waveSurfers: Record<string, Map<string, WaveSurfer>>;
  playingWsId: string | null;
};

type TWaveSurferActions = {
  _stop: () => void;
  play: (classifierId: string, wsId: string) => void;
  stop: (wsId: string) => void;
  removeWaveSurfer: (wsId: string) => void;
  addWaveSurfer: (
    classifierId: string,
    wsId: string,
    wsInstance: WaveSurfer,
  ) => void;
};

export const useWaveSurferStore = create<TWaveSurferState & TWaveSurferActions>(
  (set, get) => ({
    waveSurfers: {},
    playingWsId: null,

    _stop: () => {
      const { waveSurfers, playingWsId } = get();
      if (playingWsId) {
        for (const map of Object.values(waveSurfers)) {
          const ws = map.get(playingWsId);
          if (ws) {
            ws.stop();
            break;
          }
        }
      }
    },

    play: (classifierId, wsId) => {
      const { waveSurfers, _stop } = get();
      _stop();
      const wsToPlay = waveSurfers[classifierId]?.get(wsId);
      if (wsToPlay) {
        // 이미 재생 중이 아닌 경우에만 play 호출
        // Region.play()를 먼저 호출한 경우 이미 재생 중이므로 중복 호출 방지
        if (!wsToPlay.isPlaying()) {
          wsToPlay.play();
        }
        set({ playingWsId: wsId });
      }
    },

    stop: (wsId) => {
      const { playingWsId, _stop } = get();
      if (playingWsId === wsId) {
        _stop();
        set({ playingWsId: null });
      }
    },

    removeWaveSurfer: (wsId) => {
      const { playingWsId, _stop } = get();
      if (playingWsId === wsId) {
        _stop();
      }

      set((state) => {
        for (const classifierId in state.waveSurfers) {
          const map = _.cloneDeep(state.waveSurfers[classifierId]);
          if (map.has(wsId)) {
            map.delete(wsId);
          }

          state.waveSurfers[classifierId] = map;
        }

        return { ...state, waveSurfers: { ...state.waveSurfers } };
      });
    },

    addWaveSurfer: (classifierId, wsId, wsInstance) => {
      set((state) => {
        if (!state.waveSurfers[classifierId]) {
          state.waveSurfers[classifierId] = new Map();
        }

        const newMap = state.waveSurfers[classifierId];
        newMap.set(wsId, wsInstance);

        return {
          waveSurfers: {
            ...state.waveSurfers,
            [classifierId]: newMap,
          },
        };
      });
    },
  }),
);
