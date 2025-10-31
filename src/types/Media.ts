export type MediaType = {
  Adult: boolean
  BackdropPath: string
  Id: number
  Title: string
  OriginalTitle: string
  OriginalLanguage: string
  MediaType: 'movie' | 'tv' | 'person' | 'collection'
  Overview: string
  PosterPath: string
  Popularity: number
  ReleaseDate: string // For movies
  FirstAirDate: string // For TV series
  VoteAverage: number
  VoteCount: number
}

export type MediaResponseType = {
  Results: MediaType[]
  Page: number
  totalResults: number
  totalPages: number
  ErrorMessage: string
}
