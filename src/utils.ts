import { type WeatherAPISuccessResponse } from './types'

// eslint-disable-next-line import/prefer-default-export
export const parseWeatherData = (data: WeatherAPISuccessResponse) => {
  // Extract location information
  const locationName = data.location.name
  const locationCountry = data.location.country
  const localTime = data.location.localtime

  // Extract current weather details
  const currentTemperatureCelsius = data.current.temp_c
  const currentTemperatureFahrenheit = data.current.temp_f
  const currentWeatherCondition = data.current.condition.text
  const currentWeatherConditionIcon = data.current.condition.icon

  // Extract next 5-day forecast
  const fiveDayForecast = data.forecast.forecastday.slice(0, 5).map((day) => ({
    date: day.date,
    maxTempCelsius: day.day.maxtemp_c,
    maxTempFahrenheit: day.day.maxtemp_f,
    minTempCelsius: day.day.mintemp_c,
    minTempFahrenheit: day.day.mintemp_f,
    condition: day.day.condition.text,
    conditionIcon: day.day.condition.icon,
  }))

  return {
    location: {
      name: locationName,
      country: locationCountry,
      localTime,
    },
    current: {
      temperatureCelsius: currentTemperatureCelsius,
      temperatureFahrenheit: currentTemperatureFahrenheit,
      condition: currentWeatherCondition,
      conditionIcon: currentWeatherConditionIcon,
    },
    fiveDayForecast,
  }
}
