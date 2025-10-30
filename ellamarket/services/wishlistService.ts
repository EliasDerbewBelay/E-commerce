import { create } from "zustand";

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  addToWishlist: (item) => {
    const exists = get().items.some((i) => i.id === item.id);
    if (!exists) {
      set({ items: [...get().items, item] });
    }
  },
  removeFromWishlist: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },
}));
