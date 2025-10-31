import type { MediaType } from './Media'
import type { MovieDetailsType } from './Movie'
import type { TvSeriesDetailsType } from './TvSeries'

type TMDBMedia = {
  adult: boolean
  backdrop_path: string | null
  id: number
  title?: string
  name?: string
  original_title?: string
  original_name?: string
  original_language: string
  overview: string
  poster_path: string | null
  popularity: number
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
  media_type: 'movie' | 'tv' | 'person' | 'collection'
}

export const mapMedia = (m: TMDBMedia): MediaType => ({
  Adult: m.adult,
  BackdropPath: m.backdrop_path ?? '',
  Id: m.id,
  Title: m.title ?? m.name ?? '',
  OriginalTitle: m.original_title ?? m.original_name ?? '',
  OriginalLanguage: m.original_language,
  MediaType: m.media_type,
  Overview: m.overview,
  PosterPath: m.poster_path ?? '',
  Popularity: m.popularity,
  ReleaseDate: m.release_date ?? '',
  FirstAirDate: m.first_air_date ?? '',
  VoteAverage: m.vote_average,
  VoteCount: m.vote_count,
})

export const mapMovieDetailsToMedia = (movie: MovieDetailsType): MediaType => {
  return {
    Adult: movie.Adult,
    BackdropPath: movie.BackdropPath,
    Id: movie.Id,
    Title: movie.Title,
    OriginalTitle: movie.OriginalTitle,
    OriginalLanguage: movie.OriginalLanguage,
    MediaType: 'movie', // since this mapper is for MovieDetailsType
    Overview: movie.Overview,
    PosterPath: movie.PosterPath,
    Popularity: movie.Popularity,
    ReleaseDate: movie.ReleaseDate,
    FirstAirDate: '', // not applicable for movies
    VoteAverage: movie.VoteAverage,
    VoteCount: movie.VoteCount,
  }
}

export const mapTvSeriesDetailsToMedia = (tv: TvSeriesDetailsType): MediaType => {
  return {
    Adult: tv.Adult,
    BackdropPath: tv.BackdropPath,
    Id: tv.Id,
    Title: tv.Name, // TV shows use "Name"
    OriginalTitle: tv.OriginalName,
    OriginalLanguage: tv.OriginalLanguage,
    MediaType: 'tv',
    Overview: tv.Overview,
    PosterPath: tv.PosterPath,
    Popularity: tv.Popularity,
    ReleaseDate: '', // not applicable for TV
    FirstAirDate: tv.FirstAirDate,
    VoteAverage: tv.VoteAverage,
    VoteCount: tv.VoteCount,
  }
}
