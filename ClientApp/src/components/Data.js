import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'
import '../css/data.css'
import ReactMapGL, { Marker } from 'react-map-gl'
import redJet from '../images/redjet.png'


export default function Data() {

  const [viewport, setViewPort] = useState({
    longitude: 25,
    latitude: 25,
    zoom: 1
  })


  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [backup, setBackup] = useState([])

  if (!localStorage.getItem("access_token")) {
    window.location.href = "/login"
  }


  const axiosGet = () => {
    axios(
      {
        method: 'GET',
        url: 'https://adsbexchange-com1.p.rapidapi.com/mil/',
        headers: {
          'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com',
          'X-RapidAPI-Key': 'fbd6ba527bmsha3e7a0dc93136f2p1915dejsnc0ffb99db3c0'
        }
      }
    ).then(resp => {
      console.log(resp.data)
      if (sessionStorage)
        setData(resp.data.ac.filter(f => f.lat && f.lon))

      sessionStorage.setItem('myData', JSON.stringify(resp.data.ac.filter(f => f.lat && f.lon)))
      sessionStorage.setItem('timeStamp', new Date().getTime())
      setLoading(false)
    })
  }




  useEffect(() => {
    const storedTime = sessionStorage.getItem("timeStamp")
    const cachedData = sessionStorage.getItem("myData")


    if ((new Date().getTime() - storedTime > (5 * 60 * 1000)) || !cachedData) {
      console.log('API CALLING')
      axiosGet()
    } else {
      console.log('API PULLING CACHE')
      setData(JSON.parse(cachedData))
      setLoading(false)
    }
  }, [])

  const dataSort = (type) => {
    const sorted = [].concat(data)
      .sort((a, b) => {
        if (a[type] < b[type]) {
          return -1
        } else if (a[type] > b[type]) {
          return 1
        } else {
          return 0
        }
      })
    setData(sorted)
  }

  const intSort = (type) => {
    const sorted = [].concat(data).sort((a, b) => b[type] - a[type])
    console.log({ sorted })
    return setData(sorted)
  }


  return (
    <>
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
        {data.map((flight, index) => {
          return (
            <Marker
              key={index}
              latitude={parseFloat(flight.lat)}
              longitude={parseFloat(flight.lon)}
            >

              <Link
                to={{
                  pathname: `/flightmap/${flight.icao}`
                }}>
                <img style={{ width: '12px', transform: `rotate(${flight.trak + 'deg'})` }} src={redJet} /></Link>
            </Marker>
          )
        })}


      </ReactMapGL>
      <div>
        <section className='legend'>
          <button onClick={() => dataSort('cou')}>Military</button>
          <button onClick={() => intSort('sqk')}>Squawk</button>
          <button onClick={() => dataSort('icao')}>ICAO</button>
          <button onClick={() => dataSort('icao')}>Type</button>
          <button onClick={() => intSort('alt')}>Alt</button>
          <button onClick={() => intSort('spd')}>Spd</button>
          <button onClick={() => dataSort('postime')}>LastRep</button>
          <button onClick={() => dataSort('postime')}>Call</button>
          <button onClick={() => intSort('lat')}>Lat</button>
          <button onClick={() => intSort('lon')}>Long</button>
          <button onClick={() => dataSort('gnd')}>Grouded</button>

        </section>
        {loading && <h1>Loading...</h1>}
        {data.map((m, index) => {

          return (

            <Link key={index} to={{ pathname: `/flightmap/${m.icao}` }} >
              <section className='data' key={m.id}>
                <p>{m.cou ? m.cou : 'n/a'}</p>
                <p>{m.sqk ? m.sqk : 'n/a'}</p>
                <p>{m.icao ? m.icao : 'n/a'}</p>
                <p>{m.type ? m.type : 'n/a'}</p>
                <p>{m.alt ? m.alt + 'ft.' : 'n/a'}</p>
                <p>{m.spd ? m.spd + 'kn.' : 'n/a'}</p>
                <p><Moment format='hh:mm:ss'>{new Date(parseInt(m.postime))}</Moment></p>
                <p>{m.call ? m.call : 'n/a'}</p>
                <p>{Number(m.lat).toFixed(5)}</p>
                <p>{Number(m.lon).toFixed(5)}</p>
                <p>{m.gnd > 0 ? 'True' : 'False'}</p>
              </section>
            </Link>

          )
        })
        }
      </div>
    </>

  )
}