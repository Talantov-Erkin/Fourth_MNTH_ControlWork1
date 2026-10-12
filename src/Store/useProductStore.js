import { create } from 'zustand';
import { getProduct } from '../API/productApi';

export const useProductStore = create((set) => ({
  current: null,
  currentLoading: false,
  currentError: null,

  fetchProduct: async (id) => {
    set({ currentLoading: true, currentError: null, current: null });
    try {
      const data = await getProduct(id);
      set({ current: data, currentLoading: false });
      return data;
    } catch (e) {
      const message = e?.response?.data?.message || e.message || 'Товар не найден';
      set({ currentLoading: false, currentError: message });
      throw e;
    }
  },

  resetCurrent: () => set({ current: null, currentError: null, currentLoading: false }),
}));