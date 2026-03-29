

interface Location {
  address: string;
  country: string;
  latitude: number;
  longitude: number;
  id: string;
  county: string;
}

interface Images{
  id: string;
  url: string;
}

interface Menus{
  id: string;
  relatedId: string;
  relatedType: string;
  url: string;
  createdAt: string;
}

export interface Restaurant {
  address: string;
  description: string;
  email: string;
  id: string,
  location:Location;
  name: string;
  phone: string;
  type_food: string;
  web: string;
  images:Images[];
  menus:Menus[];
}