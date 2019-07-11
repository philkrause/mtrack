import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import FlightDetails from './FlightDetails'
import redJet from '../images/redjet.png'

export default function MapSetHooks(props) {
  const [data, setData] = useState(
    { lat: 0, lon: 0 }
  )
  const [loading, setLoading] = useState(true)
  const flightICAO = props.match.params.flighticao
  const dataKey = `${flightICAO}-data`

  const [viewport, setViewPort] = useState({
    longitude: 25,
    latitude: 25,
    zoom: 3
  })


  const axiosGet = () => {
    console.log("running get")
    axios(
      {
        method: 'GET',
        url: `https://adsbexchange-com1.p.rapidapi.com/icao/${flightICAO}/`,
        headers:
        {
          'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com',
          'X-RapidAPI-Key': 'fbd6ba527bmsha3e7a0dc93136f2p1915dejsnc0ffb99db3c0'
        }
      }
    ).then(resp => {
      console.log(resp.data.ac)
      setData(resp.data.ac[0])
      const data = resp.data.ac[0]
      localStorage.setItem(dataKey, JSON.stringify(data))
      localStorage.setItem(dataKey + '-timeStampFlight', new Date().getTime())
      setViewPort(vp => {
        console.log("svp", { vp }, { data })
        vp.latitude = parseFloat(data.lat)
        vp.longitude = parseFloat(data.lon)
        return vp
      })
      setLoading(false)
    })
  }

  useEffect(() => {
    console.log("running effect")
    const storedTime = localStorage.getItem(dataKey + '-timeStampFlight')
    const cachedData = localStorage.getItem(dataKey)
    if (new Date().getTime() - storedTime > (5 * 60 * 1000) || !cachedData) {
      console.log('api calling')
      axiosGet()

    } else {
      console.log('using local')
      const data = JSON.parse(cachedData)
      setData(data)
      setViewPort(vp => {
        vp.latitude = parseFloat(data.lat)
        vp.longitude = parseFloat(data.lon)
        return vp
      })
      setLoading(false)
    }

  }, [])

  console.log("render", { viewport })
  return (
    <>
      {loading ? 'Loading...' : ''}
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiZGRqYW5nbyIsImEiOiJjanh1bGoxbGExNmxnM21udmxlZDE0ZXd1In0.bJagpDIel0t0x73k748YtQ'}
        mapStyle='mapbox://styles/ddjango/cjxuosfk59f2q1cntkdm8m9g6'
        onViewportChange={viewport => {
          setViewPort(viewport)
        }}
        width='100vw'
        height='350px'

      >
        <Marker
          latitude={parseFloat(data.lat)}
          longitude={parseFloat(data.lon)}
        >
          {console.log(data.trak)}
          <img style={{ width: '12px', transform: `rotate(${data.trak + 'deg'})` }} src={redJet} />
        </Marker>

      </ReactMapGL>
      <FlightDetails {...data} />
    </>

  )
}
