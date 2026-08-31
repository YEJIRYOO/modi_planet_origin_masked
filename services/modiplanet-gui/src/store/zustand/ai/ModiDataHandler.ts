import { createWithEqualityFn } from 'zustand/traditional';
import { ModiRecordedData } from '@src/lib/types/modi-data';

interface ModiDataState {
  id: string | null;
  isValid: boolean;
  data: ModiRecordedData | null;
  addId: (id: string) => void;
  removeId: (id: string) => void;
  addData: (data: ModiRecordedData) => void;
  removeData: () => void;
}

export const useModiDataHandler = createWithEqualityFn<ModiDataState>(
  (set) => ({
    id: null,
    isValid: false,
    data: null,

    addId: (id: string) => {
      set((state) => {
        return { ...state, id: id };
      });
    },

    removeId: (id: string) => {
      set((state) => {
        if (state.id === id) {
          state.id = null;
        }
        return { ...state };
      });
    },

    addData: (data: any) => {
      set((state) => {
        return { ...state, data: data };
      });
    },

    removeData() {
      set((state) => {
        return { ...state, data: null };
      });
    },
  }),
  Object.is,
);
