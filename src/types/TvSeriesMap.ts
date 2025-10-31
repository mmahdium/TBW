import type { TvSeriesDetailsType } from './TvSeries'

type TMDBTvSeriesDetails = {
  adult: boolean
  backdrop_path: string | null
  created_by: Array<{
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string | null
  }>
  episode_run_time: number[]
  first_air_date: string
  genres: Array<{ id: number; name: string }>
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string | null
  } | null
  name: string
  networks: Array<{
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }>
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
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
  seasons: Array<{
    air_date: string | null
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
    vote_average: number
  }>
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export const mapTvSeriesDetails = (tv: TMDBTvSeriesDetails): TvSeriesDetailsType => ({
  Adult: tv.adult,
  BackdropPath: tv.backdrop_path ?? '',
  CreatedBy: tv.created_by.map((creator) => ({
    id: creator.id,
    creditId: creator.credit_id,
    name: creator.name,
    gender: creator.gender,
    profilePath: creator.profile_path,
  })),
  EpisodeRunTime: tv.episode_run_time,
  FirstAirDate: tv.first_air_date ?? '',
  Genres: tv.genres.map((genre) => ({
    id: genre.id,
    name: genre.name,
  })),
  Homepage: tv.homepage,
  Id: tv.id,
  InProduction: tv.in_production,
  Languages: tv.languages,
  LastAirDate: tv.last_air_date ?? '',
  LastEpisodeToAir: tv.last_episode_to_air
    ? {
        id: tv.last_episode_to_air.id,
        name: tv.last_episode_to_air.name,
        overview: tv.last_episode_to_air.overview,
        voteAverage: tv.last_episode_to_air.vote_average,
        voteCount: tv.last_episode_to_air.vote_count,
        airDate: tv.last_episode_to_air.air_date ?? '',
        episodeNumber: tv.last_episode_to_air.episode_number,
        productionCode: tv.last_episode_to_air.production_code,
        runtime: tv.last_episode_to_air.runtime ?? 0,
        seasonNumber: tv.last_episode_to_air.season_number,
        showId: tv.last_episode_to_air.show_id,
        stillPath: tv.last_episode_to_air.still_path,
      }
    : null,
  Name: tv.name,
  Networks: tv.networks.map((network) => ({
    id: network.id,
    logoPath: network.logo_path,
    name: network.name,
    originCountry: network.origin_country,
  })),
  NumberOfEpisodes: tv.number_of_episodes,
  NumberOfSeasons: tv.number_of_seasons,
  OriginCountry: tv.origin_country,
  OriginalLanguage: tv.original_language,
  OriginalName: tv.original_name,
  Overview: tv.overview,
  Popularity: tv.popularity,
  PosterPath: tv.poster_path ?? '',
  ProductionCompanies: tv.production_companies.map((company) => ({
    id: company.id,
    logoPath: company.logo_path,
    name: company.name,
    originCountry: company.origin_country,
  })),
  ProductionCountries: tv.production_countries.map((country) => ({
    iso31661: country.iso_3166_1,
    name: country.name,
  })),
  Seasons: tv.seasons.map((season) => ({
    airDate: season.air_date,
    episodeCount: season.episode_count,
    id: season.id,
    name: season.name,
    overview: season.overview,
    posterPath: season.poster_path,
    seasonNumber: season.season_number,
    voteAverage: season.vote_average,
  })),
  SpokenLanguages: tv.spoken_languages.map((lang) => ({
    englishName: lang.english_name,
    iso6391: lang.iso_639_1,
    name: lang.name,
  })),
  Status: tv.status,
  Tagline: tv.tagline,
  Type: tv.type,
  VoteAverage: tv.vote_average,
  VoteCount: tv.vote_count,
})
