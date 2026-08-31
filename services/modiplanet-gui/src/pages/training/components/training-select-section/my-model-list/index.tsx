import React, { useEffect } from 'react';
import useMyModelConnection from '@src/pages/training/hooks/useMyModelConnection';
import MyModelCard from '@src/pages/training/components/training-select-section/my-model-list/my-model-card';
import {
  AiModelCategoryType,
  useDeleteAiModelMutation,
  useUpdateAiModelMutation,
} from '@services/old/generated/graphql';
import { useMyModelConnectionStore } from '@src/store/zustand';
import CreateMyModelCard from '@src/pages/training/components/training-select-section/my-model-list/create-my-model-card';
import Loading from '@components/ui_old/loading/loading';

interface IMyModelList {
  onClickCreateCard: () => void;
  onClickMyModel: (type: AiModelCategoryType, modelId: string) => void;
  selectedMyModel: {
    id: string;
    type: AiModelCategoryType;
  } | null;
}

function MyModelList({
  onClickMyModel,
  selectedMyModel,
  onClickCreateCard,
}: IMyModelList) {
  const [myModelConnection, deleteMyModel, renameMyModel] =
    useMyModelConnectionStore((state) => [
      state.modelConnection,
      state.deleteModel,
      state.renameModel,
    ]);
  const [deleteMyModelMutation] = useDeleteAiModelMutation();
  const [updateMyModelMutation] = useUpdateAiModelMutation();

  if (!myModelConnection) return null;

  const handleCardClick = (type: AiModelCategoryType, modelId: string) => {
    return () => {
      onClickMyModel(type, modelId);
    };
  };

  const handleDeleteMyModel = (modelId: string) => async () => {
    try {
      await deleteMyModelMutation({
        variables: {
          id: modelId,
        },
      });

      deleteMyModel(modelId);
    } catch (err) {
      console.error('@@delete myModel err', err);
      throw err;
    }
  };

  const handleRenameMyModel = (modelId: string) => async (newName: string) => {
    try {
      await updateMyModelMutation({
        variables: {
          input: {
            id: modelId,
            name: newName,
          },
        },
      });

      renameMyModel(modelId, newName);
    } catch (err) {
      console.error('@@remane myModel err', err);
      throw err;
    }
  };

  return (
    <div className="flex flex-wrap -mx-[12px]">
      {myModelConnection.map(({ id, name, imageUrl, categoryType }) => {
        return (
          <div key={id} className="px-[12px] mb-[24px]">
            <MyModelCard
              name={name}
              isActive={selectedMyModel?.id === id}
              onClickCard={handleCardClick(categoryType, id)}
              onClickDelete={handleDeleteMyModel(id)}
              onClickRename={handleRenameMyModel(id)}
              imageUrl={imageUrl}
            />
          </div>
        );
      })}

      {myModelConnection && myModelConnection.length === 0 && (
        <div className="px-[12px]">
          <CreateMyModelCard onClick={onClickCreateCard} />
        </div>
      )}
    </div>
  );
}

export default MyModelList;
