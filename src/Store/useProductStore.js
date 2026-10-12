import { create } from 'zustand';
import { getProducts, getProduct } from '../API/productApi';

export const LIMIT = 9;

export const useProductStore = create((set, get) => ({
  // ------- Список -------
  products: [],
  total: 0,
  listLoading: false,
  listError: null,

  // ------- Один товар -------
  current: null,
  currentLoading: false,
  currentError: null,

  // ------- Фильтры (дублируют URL, чтобы компоненты не лезли в searchParams) -------
  q: '',
  sortBy: '',
  order: 'asc',
  page: 1,

  // ------- Действия -------
  setFilters: (patch) =>
    set((state) => {
      const next = { ...state, ...patch };
      // при смене фильтра — сбрасываем страницу
      if (!('page' in patch)) next.page = 1;
      return next;
    }),

  fetchProducts: async () => {
    const { page, q, sortBy, order } = get();
    set({ listLoading: true, listError: null });

    try {
      const data = await getProducts({ page, limit: LIMIT, q, sortBy, order });
      set({
        products: data.products,
        total: data.total,
        listLoading: false,
      });
      return data;
    } catch (e) {
      const message = e?.response?.data?.message || e.message || 'Ошибка загрузки';
      set({ listLoading: false, listError: message });
      throw e;
    }
  },

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