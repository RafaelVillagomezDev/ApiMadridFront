// useSearchValidation.ts
import type { FiltersRestaurant } from '@/types/router-types';
import { computed, type Ref } from 'vue';

export function useSearchValidation(searchQuery: FiltersRestaurant

) {
    const isInvalid = computed(() => {
        if (searchQuery.name != null) {
            const name = searchQuery.name.trim();
            return name.length > 0 && name.length < 4;
        }

    });

    const errorMessage = computed(() =>
        isInvalid.value ? '* Escribe al menos 4 caracteres' : ''
    );

    return { isInvalid, errorMessage };
}