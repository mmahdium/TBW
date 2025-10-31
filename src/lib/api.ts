import type { MediaResponseType } from '@/types/Media'
import { mapMedia } from '@/types/MediaMap'
import type { MovieDetailsType } from '@/types/Movie'
import { mapMovieDetails } from '@/types/MovieMap'
import type { TvSeriesDetailsType } from '@/types/TvSeries'
import { mapTvSeriesDetails } from '@/types/TvSeriesMap'
import axios from 'axios'

const TMDB_READ_API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjY3MDNmM2UyYTBiMmI0MGZlNGZiYjNlMTU0NjI0NCIsIm5iZiI6MTc2MDU3NDcwNi45MjQsInN1YiI6IjY4ZjAzY2YyNGZmNGM0NjI1NmM3N2EyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HHReb_7Oue_o1wkgH2mmbCgdMJ8buFfRdCtwQqj_1Us' // This is a read only key and I dont see the need for hiding it, ONLY IN THIS PARTICULAR CASE

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 6969,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TMDB_READ_API_KEY}`,
  },
})

export const searchMovies = async (query: string): Promise<MediaResponseType> => {
  const [movieSearch, tvSearch] = await Promise.all([
    instance.get(`/search/movie`, {
      params: {
        query: query,
        include_adult: true,
      },
    }),
    instance.get(`/search/tv`, {
      params: {
        query: query,
        include_adult: true,
      },
    }),
  ])

  const movieData = movieSearch.data
  const tvData = tvSearch.data

  if (movieSearch.status !== 200 || tvSearch.status !== 200) {
    return {
      Results: [],
      Page: 0,
      totalResults: 0,
      totalPages: 0,
      ErrorMessage: movieSearch.data.Error || tvSearch.data.Error,
    }
  }

  const filteredMovies = movieData.results.map((result: { media_type: string }) => {
    return { ...result, media_type: 'movie' }
  })

  const filteredTV = tvData.results.map((result: { media_type: string }) => {
    return { ...result, media_type: 'tv' }
  })

  const data: MediaResponseType = {
    Results: [...filteredMovies.map(mapMedia), ...filteredTV.map(mapMedia)],
    Page: Math.max(movieData.page, tvData.page),
    totalResults: movieData.total_results + tvData.total_results,
    totalPages: Math.max(movieData.total_pages, tvData.total_pages),
    ErrorMessage: '',
  }

  return data
}

export const loadMoreMovies = async (query: string, page: number): Promise<MediaResponseType> => {
  const response = await instance.get(`/search/multi`, {
    params: {
      query: query,
      include_adult: true,
      page: page,
    },
  })

  if (response.status !== 200) {
    return {
      Results: [],
      Page: 0,
      totalResults: 0,
      totalPages: 0,
      ErrorMessage: response.data.Error,
    }
  }

  const filtered = response.data.results.filter((result: { media_type: string }) => {
    return result.media_type === 'movie' || result.media_type === 'tv'
  })

  const data: MediaResponseType = {
    Results: filtered.map(mapMedia),
    Page: response.data.page,
    totalResults: response.data.total_results,
    totalPages: response.data.total_pages,
    ErrorMessage: '',
  }

  return data
}

export const getMovieDetails = async (id: string): Promise<MovieDetailsType | null> => {
  const response = await instance.get(`/movie/${id}`, {})

  if (response.status !== 200) {
    return null
  }

  const data: MovieDetailsType = mapMovieDetails(response.data)

  return data
}

export const getSeriesDetails = async (id: string): Promise<TvSeriesDetailsType | null> => {
  const response = await instance.get(`/tv/${id}`, {})

  if (response.status !== 200) {
    return null
  }

  const data: TvSeriesDetailsType = mapTvSeriesDetails(response.data)

  return data
}
