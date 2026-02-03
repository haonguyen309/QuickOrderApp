export type Category =
  | "Pain Relief"
  | "Antibiotic"
  | "Supplement"
  | "Allergy"
  | "Gastro";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  isPrescription: boolean;
}
