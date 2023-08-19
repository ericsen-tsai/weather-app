'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Box, TextField, Autocomplete, Grid, Typography,
} from '@mui/material'
import parse from 'autosuggest-highlight/parse'
import { debounce } from '@mui/material/utils'
import { Loader } from '@googlemaps/js-api-loader'

import LocationOnIcon from '@mui/icons-material/LocationOn'

type MainTextMatchedSubstrings = {
  offset: number
  length: number
}
type StructuredFormatting = {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}

export type PlaceType = {
  description: string
  structured_formatting: StructuredFormatting
  types: string[]
}

type AutocompleteServiceType = {
  getPlacePredictions: (
    request: { input: string },
    callback: (results?: readonly PlaceType[]) => void,
  ) => void
}

const autocompleteService: { current: null | AutocompleteServiceType } = { current: null }

type Props = {
  location: PlaceType | null
  handleLocationChange: (loc: PlaceType | null) => void
}

export default function GoogleMaps({ location, handleLocationChange }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<readonly PlaceType[]>([])

  useEffect(() => {
    const loadAutCompleteService = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: 'weekly',
      })

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { AutocompleteService } = await loader.importLibrary('places')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      autocompleteService.current = new AutocompleteService() as AutocompleteServiceType
    }
    void loadAutCompleteService()
  }, [])

  const fetchLocs = useMemo(
    () => debounce(
      (
        request: { input: string },
        callback: (results?: readonly PlaceType[]) => void,
      ) => {
        autocompleteService.current?.getPlacePredictions(request, callback)
      },
      400,
    ),
    [],
  )

  useEffect(() => {
    let active = true

    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(location ? [location] : [])
      return undefined
    }

    if (process.env.NEXT_PUBLIC_MODE === 'dev') {
      setOptions([{
        description: 'Taipei, Taiwan',
        structured_formatting: {
          main_text: 'Taipei',
          main_text_matched_substrings: [
            {
              length: 6,
              offset: 0,
            },
          ],
          secondary_text: 'Taiwan',
        },
        types: [
          'administrative_area_level_1',
          'political',
          'geocode',
        ],
      }])
    } else {
      fetchLocs({ input: inputValue }, (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = []

          if (location) {
            newOptions = [location]
          }

          if (results) {
            newOptions = [...newOptions, ...results]
          }

          setOptions(newOptions)
        }
      })
    }

    return () => {
      active = false
    }
  }, [location, inputValue, fetchLocs])

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={location}
      noOptionsText="No locations"
      onChange={(_event, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options)
        handleLocationChange(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField {...params} label="Enter a location" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: { offset: number, length: number }) => [
            match.offset,
            match.offset + match.length,
          ]),
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part) => (
                  <Box
                    key={part.text}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
