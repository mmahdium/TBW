import type { MovieDetailsType } from './Movie'

type TMDBMovieDetails = {
  adult: boolean
  backdrop_path: string | null
  budget: number
  genres: Array<{ id: number; name: string }>
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: Array<{
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export const mapMovieDetails = (m: TMDBMovieDetails): MovieDetailsType => ({
  Adult: m.adult,
  BackdropPath: m.backdrop_path ?? '',
  Budget: m.budget,
  Genres: m.genres.map((genre) => ({
    id: genre.id,
    name: genre.name,
  })),
  Homepage: m.homepage,
  Id: m.id,
  ImdbId: m.imdb_id,
  OriginalLanguage: m.original_language,
  OriginalTitle: m.original_title,
  Overview: m.overview,
  Popularity: m.popularity,
  PosterPath: m.poster_path ?? '',
  ProductionCompanies: m.production_companies.map((company) => ({
    id: company.id,
    logoPath: company.logo_path,
    name: company.name,
    originCountry: company.origin_country,
  })),
  ProductionCountries: m.production_countries.map((country) => ({
    iso31661: country.iso_3166_1,
    name: country.name,
  })),
  ReleaseDate: m.release_date,
  Revenue: m.revenue,
  Runtime: m.runtime ?? 0,
  SpokenLanguages: m.spoken_languages.map((lang) => ({
    englishName: lang.english_name,
    iso6391: lang.iso_639_1,
    name: lang.name,
  })),
  Status: m.status,
  Tagline: m.tagline ?? '',
  Title: m.title,
  Video: m.video,
  VoteAverage: m.vote_average,
  VoteCount: m.vote_count,
})
