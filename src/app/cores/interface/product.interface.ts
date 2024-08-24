export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface Category {
  slug: string
  name: string
  url: string
}


export interface Params {
  page?: number
  limit?: number
  category?: string
  search?: string
  sort?: string
  order?: string
  skip?: number

}
