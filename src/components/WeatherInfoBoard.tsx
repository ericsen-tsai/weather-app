'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  Box, Button, Stack, Typography, styled,
} from '@mui/material'

import { type parseWeatherData } from '@/utils'

type ParsedWeatherData = ReturnType<typeof parseWeatherData>

type Props = {
  location: ParsedWeatherData['location']
  current: ParsedWeatherData['current']
}

const UnitButton = styled(Button)(({ selected }: { selected?: boolean }) => ({
  minWidth: '1rem',
  color: selected ? '#000000' : 'gray',
}))

function WeatherInfoBoard({ location, current }: Props) {
  const [unitKey, setUnitKey] = useState<
    'temperatureCelsius' | 'temperatureFahrenheit'
  >('temperatureCelsius')

  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ position: 'relative', height: '7rem', width: '7rem' }}>
        <Image
          src={`https:${current.conditionIcon}`}
          alt={current.condition}
          fill
        />
      </Box>
      <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '3rem' }}>
        {Math.round(current[unitKey])}
      </Typography>
      <Stack>
        <UnitButton selected={unitKey === 'temperatureCelsius'} disableRipple onClick={() => setUnitKey('temperatureCelsius')}>
          °C
        </UnitButton>
        <UnitButton selected={unitKey === 'temperatureFahrenheit'} disableRipple onClick={() => setUnitKey('temperatureFahrenheit')}>
          °F
        </UnitButton>
      </Stack>
      <Stack sx={{ alignItems: 'end', marginLeft: 'auto' }}>
        <Typography variant="body1" sx={{ fontSize: '1.6rem' }}>
          {location.name}
          ,
          {' '}
          {location.country}
        </Typography>
        <Typography variant="body1">
          {current.condition}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default WeatherInfoBoard
