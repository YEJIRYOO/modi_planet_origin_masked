import { ProfileModel } from '@src/services/client-model/user';
import { create } from 'zustand';

type ProfileStore = {
  profile: ProfileModel | null;
  setProfile: (data: ProfileModel) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) =>
    set(() => {
      return {
        profile: { ...profile },
      };
    }),
  clearProfile: () =>
    set(() => ({
      profile: null,
    })),
}));

export * from './token';
