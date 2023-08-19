/* eslint-disable react/no-this-in-sfc */

'use client'

import { useMemo } from 'react'
import HighchartsReact from 'highcharts-react-official'
import * as Highcharts from 'highcharts'
import 'highcharts/modules/no-data-to-display'

type Props = {
  series: Highcharts.Options['series']
  date: string[]
  unit: '°C' | '°F'
}

function LineChart({
  date, series, unit,
}: Props) {
  const options: Highcharts.Options = useMemo(() => ({
    title: {
      text: '',
    },
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'monospace',
      },
    },
    yAxis: {
      title: {
        text: `Temperature ${unit}`,
        style: {
          fontSize: '12px',
          color: 'black',
        },
      },
    },
    xAxis: {
      categories: date,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
      crosshair: true,
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
    },
    credits: {
      enabled: false,
    },
    lang: {
      noData: '查無資料!',
    },
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030',
      },
      position: {
        x: 0,
        y: 0,
        align: 'center',
        verticalAlign: 'middle',
      },
    },
    plotOptions: {
      series: {
        dataGrouping: {
          enabled: true,
        },
        label: {
          connectorAllowed: false,
        },
      },
    },
    series,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
        },
      }],
    },
  }), [series, date, unit])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default LineChart
