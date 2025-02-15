export type GuitarType = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = GuitarType & {
  quantity: number;
};
