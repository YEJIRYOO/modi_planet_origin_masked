import { ContactStateType } from '@lib/constants/enums';

export interface ContactListItemModel {
  fileList: any[];
  content: string;
  state: ContactStateType;
  responseMessage: string;
  respondedAt: string;
  subject: string;
  title: string;
  createdAt: string;
}

export type ContactListModel = ContactListItemModel[];
