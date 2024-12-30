import axios from 'axios'
import { API_BASE_URL, API_ENDPOINTS } from '../config/apiConfig'

export const fetchMetadata = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.METADATA}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch metadata')
  }
}

export const fetchLiveData = async (tickers: string[]) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.LIVE_DATA}`, {
      params: { tickers: tickers.join(',') },
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch live data')
  }
}

export const fetchPredictions = async (tickers: string[]) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.PREDICTIONS}`, {
      params: { tickers: tickers.join(',') },
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch predictions')
  }
}

