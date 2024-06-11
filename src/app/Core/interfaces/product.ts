export interface Product {
  _id: string;
  imageCover: string;
  title: string;
  price: number;
  ratingsAverage: number;
  category: {
    name: string;
  };
}
