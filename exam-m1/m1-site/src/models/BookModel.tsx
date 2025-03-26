import { AuthorModel } from "./AuthorModel";

export type BookModel = {
  id: string
  title: string
  author: AuthorModel
  yearPublished: number
  price: number
}
