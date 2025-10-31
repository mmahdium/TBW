export type MovieDetailsType = {
  Adult: boolean
  BackdropPath: string
  Budget: number
  Genres: Array<{ id: number; name: string }>
  Homepage: string
  Id: number
  ImdbId: string
  OriginalLanguage: string
  OriginalTitle: string
  Overview: string
  Popularity: number
  PosterPath: string
  ProductionCompanies: Array<{
    id: number
    logoPath: string | null
    name: string
    originCountry: string
  }>
  ProductionCountries: Array<{
    iso31661: string
    name: string
  }>
  ReleaseDate: string
  Revenue: number
  Runtime: number
  SpokenLanguages: Array<{
    englishName: string
    iso6391: string
    name: string
  }>
  Status: string
  Tagline: string
  Title: string
  Video: boolean
  VoteAverage: number
  VoteCount: number
}
