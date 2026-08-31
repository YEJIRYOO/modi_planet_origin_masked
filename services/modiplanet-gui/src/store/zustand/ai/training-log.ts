import { create } from 'zustand';

interface IUseTrainingLogs {
  logs: Array<any>;
  addLog: (log: any) => void;
  clearLogs: () => void;
}

export const useTrainingLogs = create<IUseTrainingLogs>((set) => ({
  logs: [],
  addLog: (log) =>
    set(({ logs: prevLogs }) => ({
      logs: [...prevLogs, log],
    })),
  clearLogs: () =>
    set(() => ({
      logs: [],
    })),
}));
