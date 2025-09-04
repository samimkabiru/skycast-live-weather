import { create } from 'zustand';

interface SearchStore {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  searchText: '',
  setSearchText: (searchText) => set(() => ({ searchText })),
}));

export default useSearchStore;
