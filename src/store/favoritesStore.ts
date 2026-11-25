import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id) => {
        const favorites = get().favorites;

        if (favorites.includes(id)) {
          set({
            favorites: favorites.filter(
              (favoriteId) => favoriteId !== id
            ),
          });
        } else {
          set({
            favorites: [...favorites, id],
          });
        }
      },
    }),
    {
      name: "pulso-abierto-favorites",
    }
  )
);