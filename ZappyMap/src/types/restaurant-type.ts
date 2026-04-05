

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

interface Dishes{
  id:string,
  name:string;
  price:number;
  category:string;
  description:string;
}

interface Menus{
  id: string;
  name :string;
  description:string;
  dishes:Dishes[]
  
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

