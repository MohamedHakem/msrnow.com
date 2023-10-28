import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { marketplaceProductType } from '@/types';

export interface CartStore {
  items: marketplaceProductType[];
  addItem: (data: marketplaceProductType) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: marketplaceProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast.success('موجود في العربة بالفعل');
        }

        set({ items: [...get().items, data] });
        toast.success('.تم الإضافة الي العربة');
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== parseInt(id))] });
        toast.success('.تم الحذف من العربة');
      },
      removeAll: () => set({ items: [] })
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useCart;
