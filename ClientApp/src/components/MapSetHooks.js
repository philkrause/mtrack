import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


export default function MapSetHooks() {

  // useEffect(() => axiosGet(), [])

  const axiosGet = () => {
    axios(
      {
        method: 'GET',
        url: 'https://adsbexchange-com1.p.rapidapi.com/icao/AE5965/',
        headers:
        {
          'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com',
          'X-RapidAPI-Key': 'fbd6ba527bmsha3e7a0dc93136f2p1915dejsnc0ffb99db3c0'
        }
      }
    ).then(resp => {
      console.log(resp.data.ac)
      setData(resp.data.ac)
    })
  }

  const [data, setData] = useState()

  const [viewport, setViewPort] = useState({
    latitude: 33,
    longitude: -101,
    width: '100vw',
    height: '100vw',
    zoom: 10
  })


  return (
    <>
      <section className='map'>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken='pk.eyJ1IjoiZGRqYW5nbyIsImEiOiJjanh1enp3c2wwMTB6M2JvNGJ5Y253d3h6In0.Mqn0tHfATEdZXpcD4PunAw'
          mapStyle='mapbox://styles/ddjango/cjxuosfk59f2q1cntkdm8m9g6'
          onViewportChange={viewport => { setViewPort(viewport) }}
        >
          <Marker
            latitude={33.769135}
            longitude={-101.948303}
          >
          </Marker>
        </ReactMapGL>
      </section>
    </>
  )
}
