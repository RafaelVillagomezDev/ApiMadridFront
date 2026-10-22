import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import type { Restaurant } from '@/types/restaurant-type';
import LocationTab from '../LocationTab.vue';

const leaflet = vi.hoisted(() => {
  const mapInstance = {
    setView: vi.fn(),
    invalidateSize: vi.fn(),
    remove: vi.fn(),
  };
  mapInstance.setView.mockReturnValue(mapInstance);

  const markerInstance = {
    addTo: vi.fn(),
    bindPopup: vi.fn(),
    openPopup: vi.fn(),
  };
  markerInstance.addTo.mockReturnValue(markerInstance);
  markerInstance.bindPopup.mockReturnValue(markerInstance);

  const tileLayerInstance = { addTo: vi.fn() };

  return {
    mapInstance,
    markerInstance,
    map: vi.fn(() => mapInstance),
    marker: vi.fn(() => markerInstance),
    tileLayer: vi.fn(() => tileLayerInstance),
  };
});

vi.mock('leaflet', () => ({
  default: {
    map: leaflet.map,
    marker: leaflet.marker,
    tileLayer: leaflet.tileLayer,
  },
}));

const buildRestaurant = (overrides: Partial<Restaurant> = {}): Restaurant => ({
  id: '1',
  name: 'Casa Lucio',
  address: 'Calle Cava Baja 35',
  description: 'Huevos rotos',
  email: 'info@casalucio.es',
  phone: '913653252',
  type_food: 'Española',
  price: 'medio',
  web: 'https://casalucio.es',
  images: [],
  menus: [],
  payment_methods: [],
  location: {
    id: 'loc-1',
    address: 'Calle Cava Baja 35',
    county: 'Madrid',
    country: 'España',
    latitude: 40.4125,
    longitude: -3.7089,
  },
  ...overrides,
});

describe('LocationTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra dirección, ciudad y país', () => {
    const wrapper = mount(LocationTab, {
      props: { restaurant: buildRestaurant() },
    });

    const text = wrapper.text();
    expect(text).toContain('Calle Cava Baja 35');
    expect(text).toContain('Madrid');
    expect(text).toContain('España');
    expect(text).toContain('Ubicación de Casa Lucio');
  });

  it('genera el enlace a Google Maps con las coordenadas', () => {
    const wrapper = mount(LocationTab, {
      props: { restaurant: buildRestaurant() },
    });

    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe(
      'https://www.google.com/maps/search/?api=1&query=40.4125,-3.7089',
    );
  });

  it('inicializa el mapa con el marcador y el nombre del restaurante', async () => {
    mount(LocationTab, {
      props: { restaurant: buildRestaurant() },
      attachTo: document.body,
    });
    await flushPromises();

    expect(leaflet.map).toHaveBeenCalledTimes(1);
    expect(leaflet.mapInstance.setView).toHaveBeenCalledWith([40.4125, -3.7089], 15);
    expect(leaflet.marker).toHaveBeenCalledWith([40.4125, -3.7089]);
    expect(leaflet.markerInstance.bindPopup).toHaveBeenCalledWith('Casa Lucio');
    expect(leaflet.mapInstance.invalidateSize).toHaveBeenCalled();
  });

  it('usa "Restaurante" como popup si no hay nombre', async () => {
    mount(LocationTab, {
      props: { restaurant: buildRestaurant({ name: '' }) },
      attachTo: document.body,
    });
    await flushPromises();

    expect(leaflet.markerInstance.bindPopup).toHaveBeenCalledWith('Restaurante');
  });

  it('no crea el mapa ni el enlace si las coordenadas no son válidas', async () => {
    const restaurant = buildRestaurant();
    restaurant.location.latitude = Number.NaN;

    const wrapper = mount(LocationTab, {
      props: { restaurant },
      attachTo: document.body,
    });
    await flushPromises();

    expect(leaflet.map).not.toHaveBeenCalled();
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('elimina el mapa al desmontar', async () => {
    const wrapper = mount(LocationTab, {
      props: { restaurant: buildRestaurant() },
      attachTo: document.body,
    });
    await flushPromises();

    wrapper.unmount();
    expect(leaflet.mapInstance.remove).toHaveBeenCalled();
  });
});
