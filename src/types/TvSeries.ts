export type TvSeriesDetailsType = {
  Adult: boolean
  BackdropPath: string
  CreatedBy: Array<{
    id: number
    creditId: string
    name: string
    gender: number
    profilePath: string | null
  }>
  EpisodeRunTime: number[]
  FirstAirDate: string
  Genres: Array<{ id: number; name: string }>
  Homepage: string
  Id: number
  InProduction: boolean
  Languages: string[]
  LastAirDate: string
  LastEpisodeToAir: {
    id: number
    name: string
    overview: string
    voteAverage: number
    voteCount: number
    airDate: string
    episodeNumber: number
    productionCode: string
    runtime: number
    seasonNumber: number
    showId: number
    stillPath: string | null
  } | null
  Name: string
  Networks: Array<{
    id: number
    logoPath: string | null
    name: string
    originCountry: string
  }>
  NumberOfEpisodes: number
  NumberOfSeasons: number
  OriginCountry: string[]
  OriginalLanguage: string
  OriginalName: string
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
  Seasons: Array<{
    airDate: string | null
    episodeCount: number
    id: number
    name: string
    overview: string
    posterPath: string | null
    seasonNumber: number
    voteAverage: number
  }>
  SpokenLanguages: Array<{
    englishName: string
    iso6391: string
    name: string
  }>
  Status: string
  Tagline: string
  Type: string
  VoteAverage: number
  VoteCount: number
}
