'use client'

import { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'

import { MapSearch, WeatherInfoBoard } from '@/components'
import { type PlaceType } from '@/components/MapSearch'
import {
  type WeatherAPIFailResponse,
  type WeatherAPISuccessResponse,
} from '@/types'
import { parseWeatherData } from '@/utils'

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
  const handleLocationChange = (l: PlaceType | null) => {
    setLocation(l)
  }

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSearch = async () => {
    if (!location) return
    setErrorMessage('')
    if (!location.types.includes('geocode')) {
      setErrorMessage('please enter a city name')
      return
    }
    setLoading(true)
    await getWeatherByCityName(location.structured_formatting.main_text)
      .then((data) => {
        if ('error' in data) {
          setErrorMessage(data.error.message)
        } else {
          setCityData(parseWeatherData(data))
        }
      })
      .catch((error: Error) => setErrorMessage(error.message))
    setLoading(false)
  }

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
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
          disabled={!location}
        >
          Search!
        </Button>
      </Stack>
      <Typography variant="body1" color="error">
        {errorMessage}
      </Typography>
      {!loading && !errorMessage && cityData && (
        <WeatherInfoBoard
          location={cityData.location}
          current={cityData.current}
        />
      )}
    </Stack>
  )
}

export default SearchPanel
