/* eslint-disable import/prefer-default-export */
import { type WeatherAPIFailResponse, type WeatherAPISuccessResponse } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'
import { fakeLocationData } from '@/mock'

const API_SOURCE = 'http://api.weatherapi.com/v1/forecast.json'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const q = url.searchParams.get('q') as string
  if (process.env.NEXT_PUBLIC_MODE === 'dev') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 500)
    })
    return NextResponse.json(fakeLocationData)
  }

  const res = await fetch(
    `${API_SOURCE}?${
      new URLSearchParams({
        q,
        days: '5',
        key: process.env.API_KEY as string,
      }).toString()}`,
    {
      method: 'GET',
      cache: 'force-cache',
    },
  )

  const result = await res.json() as (WeatherAPIFailResponse | WeatherAPISuccessResponse)

  return NextResponse.json(result)
}
