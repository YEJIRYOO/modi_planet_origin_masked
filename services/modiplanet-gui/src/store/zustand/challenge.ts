import { create } from 'zustand';

import { QuestionAnswer } from '@services/old/generated/graphql';

interface IUseQuestionAnswers {
  answers: Array<QuestionAnswer>;
  initAnswers: (answers: Array<QuestionAnswer>) => void;
  updateChoices: (index: number, choices: Array<string>) => void;
}

interface IUseQuizTakingId {
  quizTakingId: null | string;
  setQuizTakingId: (id: string) => void;
}

export const useQuestionAnswers = create<IUseQuestionAnswers>((set) => ({
  answers: [],
  initAnswers: (answers) => {
    set(() => ({
      answers,
    }));
  },
  updateChoices: (index, choices) => {
    set((state) => {
      if (state.answers.length > 0) {
        state.answers[index].choiceIds = choices;
      }
      return state;
    });
  },
}));

export const useQuizTakingId = create<IUseQuizTakingId>((set) => ({
  quizTakingId: null,
  setQuizTakingId: (id) =>
    set(() => ({
      quizTakingId: id,
    })),
}));
