import { ProjectList } from '@services/api/project/types';
import { ProjectListModel } from '@services/client-model/project';

export const parseProjectListModel = (
  projectList: ProjectList,
): ProjectListModel => {
  if (!projectList) return [];

  return projectList.map((project) => ({
    id: project!.id,
    title: project!.title,
    codeType: project!.codeType,
    runType: project!.runType,
    isFavorite: project!.isFavorite,
    jsonData: project!.jsonData,
    thumb: project!.thumb,
    createdAt: project!.createdAt,
    updatedAt: project!.updatedAt,
  }));
};
