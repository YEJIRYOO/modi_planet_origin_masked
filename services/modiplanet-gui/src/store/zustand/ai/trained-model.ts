import { create } from 'zustand';

import { TModelVariables } from '@src/pages/training/image/hooks/useLearningImageModel';
import { TDataModelVariables } from '@src/pages/training/modi/hooks/useLearingModiModel';

interface IUseLearningModel {
  model: null | TModelVariables;
  setModel: (model: TModelVariables | null) => void;
  clearModel: () => void;
}

interface IUseVoiceModel {
  model: null | TDataModelVariables;
  setModel: (model: TDataModelVariables | null) => void;
  clearModel: () => void;
}

interface IUseDataModel {
  model: null | TDataModelVariables;
  setModel: (model: TDataModelVariables | null) => void;
  clearModel: () => void;
}

export const useLearningModel = create<IUseLearningModel>((set) => ({
  model: null,
  setModel: (model) =>
    set(() => ({
      model,
    })),
  clearModel: () =>
    set(() => ({
      model: null,
    })),
}));

export const useVoiceModel = create<IUseVoiceModel>((set) => ({
  model: null,
  setModel: (model) =>
    set(() => ({
      model,
    })),
  clearModel: () =>
    set(() => ({
      model: null,
    })),
}));

export const useDataModel = create<IUseDataModel>((set) => ({
  model: null,
  setModel: (model) =>
    set(() => ({
      model,
    })),
  clearModel: () =>
    set(() => ({
      model: null,
    })),
}));
