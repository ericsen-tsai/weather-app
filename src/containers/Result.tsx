'use client'

import { WeatherInfoBoard, LineChart } from '@/components'
import { type TemperatureUnit } from '@/types'
import { type parseWeatherData } from '@/utils'
import { Box, Stack, Tooltip } from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'

type CityData = ReturnType<typeof parseWeatherData>

type Props = {
  cityData: CityData
}

type ForecastData = {
  max: { [K in TemperatureUnit]: number[] }
  min: { [K in TemperatureUnit]: number[] }
  condition: {
    date: string
    type: string
    icon: string
  }[]
}

const parseForecastData = (data: CityData['fiveDayForecast']) => data.reduce<ForecastData>(
  (res, d) => ({
    min: {
      '°C': [...res.min['°C'], d.minTempCelsius],
      '°F': [...res.min['°F'], d.minTempFahrenheit],
    },
    max: {
      '°C': [...res.max['°C'], d.maxTempCelsius],
      '°F': [...res.max['°F'], d.maxTempFahrenheit],
    },
    condition: [
      ...res.condition,
      {
        date: d.date,
        type: d.condition,
        icon: d.conditionIcon,
      },
    ],
  }),
  {
    min: {
      '°C': [],
      '°F': [],
    },
    max: {
      '°C': [],
      '°F': [],
    },
    condition: [],
  },
)

function Result({ cityData }: Props) {
  const [unit, setUnit] = useState<TemperatureUnit>('°C')

  const handleUnitChange = (key: TemperatureUnit) => {
    setUnit(key)
  }

  const { min, max, condition } = parseForecastData(cityData.fiveDayForecast)

  return (
    <Box>
      <WeatherInfoBoard
        location={cityData.location}
        current={cityData.current}
        unit={unit}
        handleUnitChange={handleUnitChange}
      />
      <Box
        sx={{
          borderRadius: '0.5rem',
          overflow: 'hidden',
          backgroundColor: '#ffffff99',
          pb: '1.5rem',
        }}
      >
        <LineChart
          date={cityData.fiveDayForecast.map((c) => c.date)}
          unit={unit}
          series={[
            {
              name: 'min',
              data: min[unit],
              type: 'line',
              color: '#429488',
            },
            {
              name: 'max',
              data: max[unit],
              type: 'line',
            },
          ]}
        />
        <Stack
          direction="row"
          justifyContent="space-around"
          width="90%"
          ml="auto"
        >
          {condition.map(({ type, icon, date }) => (
            <Tooltip
              title={type}
              arrow
              key={date}
            >
              <Box
                sx={{
                  height: '1.6rem', width: '1.6rem', position: 'relative',
                }}
              >
                <Image src={`https:${icon}`} alt={type} fill />
              </Box>
            </Tooltip>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default Result
