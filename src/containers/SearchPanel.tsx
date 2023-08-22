'use client'

import { useEffect, useState } from 'react'
import {
  Button, CircularProgress, Stack, Typography,
} from '@mui/material'
import { MapSearch } from '@/components'
import { type PlaceType } from '@/components/MapSearch'
import {
  type WeatherAPIFailResponse,
  type WeatherAPISuccessResponse,
} from '@/types'
import { parseWeatherData } from '@/utils'
import { useSearchParams } from 'next/navigation'
import { addHistory } from '@/app/actions'
import { Timestamp } from 'firebase/firestore'
import Result from './Result'

const getWeatherByCityName = async (city: string) => {
  const qs = new URLSearchParams({
    q: city,
  }).toString()
  const res = await fetch(`/api/weather?${qs}`)
  const data = (await res.json()) as
    | WeatherAPIFailResponse
    | WeatherAPISuccessResponse
  return data
}

function SearchPanel() {
  const [location, setLocation] = useState<PlaceType | null>(null)
  const [cityData, setCityData] = useState<ReturnType<
    typeof parseWeatherData
  > | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [searched, setSearched] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const searchParams = useSearchParams()
  const q = searchParams.get('q')

  const handleLocationChange = (l: PlaceType | null) => {
    setLocation(l)
    setSearched(false)
  }

  const handleSearch = async () => {
    if (!location) return
    setErrorMessage('')
    if (!location.types.includes('geocode')) {
      setErrorMessage('please enter a city name')
      return
    }
    setLoading(true)
    await getWeatherByCityName(`${location.structured_formatting.main_text} ${location.structured_formatting.secondary_text}`)
      .then((data) => {
        if ('error' in data) {
          setErrorMessage(data.error.message)
        } else {
          setCityData(parseWeatherData(data))
          setSearched(true)
          void addHistory({
            local_time: data.location.localtime,
            location: `${location.structured_formatting.main_text} ${location.structured_formatting.secondary_text}`,
            created_at: Timestamp.now(),
          })
        }
      })
      .catch((error: Error) => setErrorMessage(error.message))
    setLoading(false)
  }

  useEffect(() => {
    const fetchWeather = async () => {
      if (!q) return
      setLoading(true)
      await getWeatherByCityName(q)
        .then((data) => {
          if ('error' in data) {
            setErrorMessage(data.error.message)
          } else {
            setCityData(parseWeatherData(data))
            setSearched(true)
          }
        })
        .catch((error: Error) => setErrorMessage(error.message))
      setLoading(false)
    }
    void fetchWeather()
  }, [q])

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" gap="0.5rem">
        <MapSearch
          location={location}
          handleLocationChange={handleLocationChange}
        />
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            void handleSearch()
          }}
          disabled={!location || searched}
        >
          Search!
        </Button>
      </Stack>
      {!loading && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
      {!loading && !errorMessage && cityData && (
        <Result cityData={cityData} />
      )}
      {loading && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: '30rem', width: '100%' }}
        >
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  )
}

export default SearchPanel
