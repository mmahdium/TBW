/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MediaResponseType } from '@/types/Media'
import { mapMedia } from '@/types/MediaMap'
import type { MovieDetailsType } from '@/types/Movie'
import { mapMovieDetails } from '@/types/MovieMap'
import type { SearchFilters } from '@/types/SearchFilters'
import type { TvSeriesDetailsType } from '@/types/TvSeries'
import { mapTvSeriesDetails } from '@/types/TvSeriesMap'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://6909aa3d0001d5d30ff1.fra.appwrite.run/3',
  timeout: 6969,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const loadMedia = async (
  query: string,
  page = 1,
  filters: SearchFilters,
): Promise<MediaResponseType> => {
  const params = {
    query,
    include_adult: filters.includeAdult || false,
    page,
  }
  const requests: Promise<any>[] = []
  if (filters.onlyMovies) {
    requests.push(instance.get(`/search/movie`, { params }))
  }
  if (filters.onlySeries) {
    requests.push(instance.get(`/search/tv`, { params }))
  }

  const responses = await Promise.all(requests)

  // If only one type was requested, handle that directly
  if (filters.onlyMovies && !filters.onlySeries) {
    const movieSearch = responses[0]
    if (movieSearch.status !== 200) {
      return {
        Results: [],
        Page: 0,
        totalResults: 0,
        totalPages: 0,
        ErrorMessage: movieSearch.data.Error,
      }
    }
    const movies = movieSearch.data.results.map((r: any) => mapMedia({ ...r, media_type: 'movie' }))
    return {
      Results: movies,
      Page: movieSearch.data.page,
      totalResults: movieSearch.data.total_results,
      totalPages: movieSearch.data.total_pages,
      ErrorMessage: '',
    }
  }

  if (filters.onlySeries && !filters.onlyMovies) {
    const tvSearch = responses[0]
    if (tvSearch.status !== 200) {
      return {
        Results: [],
        Page: 0,
        totalResults: 0,
        totalPages: 0,
        ErrorMessage: tvSearch.data.Error,
      }
    }
    const tv = tvSearch.data.results.map((r: any) => mapMedia({ ...r, media_type: 'tv' }))
    return {
      Results: tv,
      Page: tvSearch.data.page,
      totalResults: tvSearch.data.total_results,
      totalPages: tvSearch.data.total_pages,
      ErrorMessage: '',
    }
  }

  // Otherwise, both
  const [movieSearch, tvSearch] = responses
  if (movieSearch.status !== 200 || tvSearch.status !== 200) {
    return {
      Results: [],
      Page: 0,
      totalResults: 0,
      totalPages: 0,
      ErrorMessage: movieSearch?.data?.Error || tvSearch?.data?.Error,
    }
  }

  const filteredMovies = movieSearch.data.results.map((r: any) =>
    mapMedia({ ...r, media_type: 'movie' }),
  )
  const filteredTV = tvSearch.data.results.map((r: any) => mapMedia({ ...r, media_type: 'tv' }))

  const res: any[] = []
  for (let i = 0; i < Math.max(filteredMovies.length, filteredTV.length); i++) {
    if (i < filteredMovies.length) res.push(filteredMovies[i])
    if (i < filteredTV.length) res.push(filteredTV[i])
  }

  return {
    Results: res,
    Page: Math.max(movieSearch.data.page, tvSearch.data.page),
    totalResults: movieSearch.data.total_results + tvSearch.data.total_results,
    totalPages: Math.max(movieSearch.data.total_pages, tvSearch.data.total_pages),
    ErrorMessage: '',
  }
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
