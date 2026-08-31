import { ContactList } from '@services/api/contact/types';
import { ContactListModel } from '@services/client-model/contact';

export const parseContactListModel = (
  contactList: ContactList,
): ContactListModel => {
  return contactList.map((contact) => ({
    fileList: contact.fileList || [],
    content: contact.content,
    state: contact.state,
    responseMessage: contact.responseMessage || '',
    respondedAt: contact.respondedAt || '',
    subject: contact.subject,
    title: contact.title,
    createdAt: contact.createdAt,
  }));
};
