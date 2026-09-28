import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const createRestaurantStepOneSchema = toTypedSchema(
    z.object({
        address: z
            .string()
            .trim()
            .min(1, '*Campo obligatorio')
            .min(4, '*La dirección es muy corta (mínimo 4 caracteres)')
            .max(200, '*La dirección debe tener máximo 200 caracteres')
            .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s,.\-#º/]+$/, '*La dirección contiene caracteres no permitidos'),

        name: z
            .string()
            .trim()
            .min(1, '*Campo obligatorio')
            .min(4, '*El nombre debe tener al menos 4 caracteres')
            .max(30, '*El nombre debe tener máximo 30 caracteres')
            .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/, '*El nombre solo debe contener letras y números'),

        email: z
            .string()
            .trim()
            .min(1, '*Campo obligatorio')
            .max(50, '*El email debe tener máximo 50 caracteres')
            .email('*Formato de email inválido'),

        description: z
            .string()
            .trim()
            .min(1, '*Campo obligatorio')
            .min(10, '*La descripción debe tener al menos 10 caracteres')
            .max(1200, '*La descripción debe tener máximo 1200 caracteres'),

        phone: z
            .string()
            .trim()
            .min(1, '*Campo obligatorio')
            .min(7, '*El teléfono debe tener al menos 7 caracteres')
            .max(16, '*El teléfono debe tener máximo 16 caracteres')
            .regex(/^(\+?\d{1,4}|00\d{1,4})?\d{6,12}$/, '*El teléfono contiene un formato inválido (solo números, sin espacios)'),

        type_food: z
            .string()
            .trim()
            .min(1, '*Campo obligatorio')
            .min(3, '*El tipo de comida debe tener al menos 3 caracteres')
            .max(25, '*El tipo de comida debe tener máximo 25 caracteres')
            .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, '*El tipo de comida solo debe contener letras'),

        web: z
            .string()
            .trim()
            .min(10, '*La web debe tener al menos 10 caracteres')
            .max(250, '*La web debe tener máximo 250 caracteres')
            .regex(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/, '*La web debe ser una URL válida (ej. https://ejemplo.com)')
            .optional()
            .or(z.literal('')),
    })
);

export const createRestaurantStepTwoSchema = toTypedSchema(
    z.object({
        address: z
            .string()
            .trim()
            .min(1, 'Campo obligatorio')
            .min(4, 'La dirección es muy corta (mínimo 4 caracteres)')
            .max(200, 'La dirección debe tener máximo 200 caracteres')
            .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s,.\-#º/]+$/, 'La dirección contiene caracteres no permitidos'),

        city: z
            .string()
            .trim()
            .min(1, 'Campo obligatorio')
            .min(2, 'La ciudad debe tener al menos 2 caracteres')
            .max(50, 'La ciudad debe tener máximo 50 caracteres')
            .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'La ciudad solo debe contener letras'),

        zip_code: z
            .string()
            .trim()
            .min(1, 'Campo obligatorio')
            .regex(
                /^(0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/, 
                'Debe ser un código postal español válido (ej. 28001)'
            ),
    })
);