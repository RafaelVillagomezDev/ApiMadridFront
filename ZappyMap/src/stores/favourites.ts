import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface BaseItem {
    id: string | number;
    [key: string]: any;
}

export const useFavouritesStore = defineStore('favourites', () => {

    const favourites = ref<BaseItem[]>([]);

   
    const toggleFavourite = <T extends BaseItem>(item: T): void => {
        const index = favourites.value.findIndex(fav => fav.id === item.id);

        if (index > -1) {
            favourites.value.splice(index, 1);
        } else {
            favourites.value.push(item as any);
        }
    };

    const isFavourite = computed(() => {
        return (id: string | number | undefined) =>
            favourites.value.some(fav => fav.id === id);
    });

   
    const removeFavourite = (id: string | number) => {
        favourites.value = favourites.value.filter(fav => fav.id !== id);
    };

    return {
        favourites,
        toggleFavourite, 
        removeFavourite,
        isFavourite 
    }
}, {
    persist: {
        key: 'favourites-store',
        storage: localStorage,
        pick: ['favourites'],
    }
});