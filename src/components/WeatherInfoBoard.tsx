'use client'

import Image from 'next/image'
import {
  Box, Button, Stack, Typography, styled, Divider,
} from '@mui/material'

import { type parseWeatherData } from '@/utils'
import { type TemperatureUnit } from '@/types'

type ParsedWeatherData = ReturnType<typeof parseWeatherData>

type Props = {
  location: ParsedWeatherData['location']
  current: ParsedWeatherData['current']
  unit: TemperatureUnit
  handleUnitChange: (key: TemperatureUnit) => void
}

const colorMap = {
  dark: '#ffffff',
  light: '#000000',
}

type RootProps = {
  selected: boolean
}

const UnitButton = styled(Button)<RootProps>(({ selected, theme }) => ({
  minWidth: '1rem',
  color: selected ? colorMap[theme?.palette.mode ?? 'light'] : 'gray',
  fontSize: '1.2rem',
}))

function WeatherInfoBoard({
  location, current, unit, handleUnitChange,
}: Props) {
  const unitKey = unit === '°C' ? 'temperatureCelsius' : 'temperatureFahrenheit'

  return (
    <Stack direction="row" alignItems="center" sx={{ my: 3 }}>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        alignItems="center"
      >
        <Box sx={{ position: 'relative', height: '7rem', width: '7rem' }}>
          <Image
            src={`https:${current.conditionIcon}`}
            alt={current.condition}
            fill
          />
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            fontSize: '3rem',
            mt: {
              xs: '-2rem',
              sm: 0,
            },
          }}
        >
          {Math.round(current[unitKey])}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <UnitButton selected={unitKey === 'temperatureCelsius'} disableRipple onClick={() => handleUnitChange('°C')}>
          °C
        </UnitButton>
        <Divider orientation="vertical" flexItem sx={{ my: '0.5rem' }} />
        <UnitButton selected={unitKey === 'temperatureFahrenheit'} disableRipple onClick={() => handleUnitChange('°F')}>
          °F
        </UnitButton>
      </Stack>
      <Stack sx={{ alignItems: 'end', marginLeft: 'auto', textAlign: 'right' }}>
        <Typography variant="body2">
          {location.localTime}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.4rem' }}>
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
