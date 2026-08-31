import { ProjectCodeType, ProjectRunType, ImageInfo } from '@services/gen/gen';

export type ProjectListItemModel = {
  id: string;
  title: string;
  codeType: ProjectCodeType;
  runType: ProjectRunType;
  isFavorite: boolean;
  jsonData: string;
  thumb: ImageInfo;
  createdAt: string;
  updatedAt: string;
};

export type ProjectListModel = ProjectListItemModel[];
