import { create } from 'zustand';

interface ExpandedStore {
  isExpanded: boolean;
  setExpanded: () => void;
}

const useExpandedStore = create<ExpandedStore>((set) => ({
  isExpanded: false,
  setExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));

export default useExpandedStore;
