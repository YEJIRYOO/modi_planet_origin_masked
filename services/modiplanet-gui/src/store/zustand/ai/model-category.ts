import { create } from 'zustand';
import { TAIModelCategories } from '@services/old/schema/types';

type TAIModelCategory = TAIModelCategories[0];
interface IUseSelectedModelCategory {
  modelCategory: TAIModelCategory | null;
  setModelCategory: (category: TAIModelCategory) => void;
}

export const useSelectedModelCategory = create<IUseSelectedModelCategory>(
  (set) => ({
    modelCategory: null,
    setModelCategory: (modelCategory) =>
      set(() => ({
        modelCategory,
      })),
  }),
);
