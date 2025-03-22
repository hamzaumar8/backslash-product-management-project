export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock?: number;
  image: string;
  created_at: string | null;
  updated_at: string | null;
}
