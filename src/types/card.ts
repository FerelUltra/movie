export interface ICard{
  id: number,
  genres: number[],
  img: string,
  img2: string,
  date: string,
  overview: string,
  title: string,
  vote: number
  myRate?: number
}
