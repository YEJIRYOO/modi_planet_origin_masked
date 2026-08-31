import { EStorageKey } from '@src/lib/constants/enums';

export const getHistory = () => {
  return sessionStorage.getItem(EStorageKey.HISTORY);
};

export const storeHistory = (history: string) => {
  sessionStorage.setItem(EStorageKey.HISTORY, history);
};

export const removeHistory = () => {
  sessionStorage.removeItem(EStorageKey.HISTORY);
};
