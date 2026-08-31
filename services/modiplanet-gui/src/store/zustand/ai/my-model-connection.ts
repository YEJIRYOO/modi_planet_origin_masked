import { create } from 'zustand';
import { AiModelCategoryType } from '@services/old/generated/graphql';
import { TAiModelConnection } from '@services/old/schema/types';

type TMyModel = {
  id: string;
  name: string;
  imageUrl: string;
  categoryType: AiModelCategoryType;
};

interface IUseMyModelConnectionState {
  modelConnection: null | Array<TMyModel>;
}

interface IUseMyModelConnectionAction {
  setModelConnectionFromServer: (
    modelConnectionFromServer: TAiModelConnection,
  ) => void;
  deleteModel: (modelId: string) => void;
  renameModel: (modelId: string, newName: string) => void;
}

export const useMyModelConnectionStore = create<
  IUseMyModelConnectionState & IUseMyModelConnectionAction
>((set) => ({
  modelConnection: null,
  setModelConnectionFromServer: (modelConnectionFromServer) =>
    set(() => {
      const convertedModelConnection: Array<TMyModel> =
        modelConnectionFromServer.map((model) => {
          return {
            id: model.id,
            categoryType: model.aiModelCategory?.type as AiModelCategoryType,
            imageUrl: model.aiModelCategory?.imageUrl as string,
            name: model.name,
          };
        });
      return {
        modelConnection: convertedModelConnection,
      };
    }),
  deleteModel: (modelId) =>
    set(({ modelConnection }) => {
      const deletedModelConnection = modelConnection
        ? modelConnection.filter(({ id }) => id !== modelId)
        : null;
      return { modelConnection: deletedModelConnection };
    }),
  renameModel: (modelId, newName) =>
    set(({ modelConnection }) => ({
      modelConnection: modelConnection
        ? modelConnection.map((model) =>
            model.id === modelId ? { ...model, name: newName } : model,
          )
        : null,
    })),
}));
