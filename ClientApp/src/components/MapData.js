import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import FlightDetails from './FlightDetails'
import redJet from '../images/redjet.png'
import auth from '../auth';

export default function MapSetHooks(props) {

  const [loading, setLoading] = useState(true)
  const [land, setLand] = useState('')
  const [flight, setFlight] = useState('')
  const [backup, setBackup] = useState('')


  const [data, setData] = useState(
    { lat: 0, lon: 0 }
  )
  const flightICAO = props.match.params.flighticao
  const dataKey = `${flightICAO}-data`

  const [viewport, setViewPort] = useState({
    longitude: 25,
    latitude: 25,
    zoom: 6
  })

  const [userData, setUserData] = useState({})


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
      if (!resp.data.ac) {
        const data = JSON.parse(sessionStorage.getItem("myData")).filter(f => f.icao == flightICAO)
        console.log({ data })
        // setData(props.location.state.allData.filter(x => x.icao == flightICAO))
        // console.log('using link state data')
      } else {
        setData(resp.data.ac[0])
        // setUserData(sessionStorage.getItem(access_token), resp.data.ac[0].icao)
        const data = resp.data.ac[0]
        const fpost = () => axios.post('flightinfo/addflight', data)
        fpost()
        const axiosUserPost = () => {
          axios.post({
            method: 'POST',
            url: `user/${flightICAO}/adduserflight`,
            headers: { "Authorization": "Bearer" + auth.authorizationHeader() }
          })
        }
        axiosUserPost()
        sessionStorage.setItem(dataKey, JSON.stringify(data))
        sessionStorage.setItem(dataKey + '-timeStampFlight', new Date().getTime())
        setViewPort(vp => {
          console.log("svp", { vp }, { data })
          vp.latitude = parseFloat(data.lat)
          vp.longitude = parseFloat(data.lon)
          return vp
        })
        setLoading(false)
        console.log("myinfo", data)
      }
    })


  }



  useEffect(() => {
    console.log("running effect")
    const storedTime = sessionStorage.getItem(dataKey + '-timeStampFlight')
    const cachedData = sessionStorage.getItem(dataKey)
    if (new Date().getTime() - storedTime > (5 * 60 * 1000) || !cachedData) {
      console.log('api calling')
      axiosGet()

    } else {
      console.log('using session')
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


  return (
    <>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>{land}</h1>
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
        <Marker latitude={parseFloat(data.lat)} longitude={parseFloat(data.lon)}>
          <button
            style={{ border: 'none' }}
            onClick={e => {
              e.preventDefault();
              setFlight(data)
            }}
          >
            <img style={{ width: '18px', transform: `rotate(${data.trak + 'deg'})` }} src={redJet} />
          </button>
        </Marker>
        {flight ? (
          <Popup
            latitude={parseFloat(data.lat)}
            longitude={parseFloat(data.lon)}
            onClose={() => {
              setFlight(null)
            }}
          >
            <div className='flight-marker'>
              <p>Country: {data.cou ? data.cou : 'n/a'}</p>
              <p>Call: {data.call ? data.call : 'n/a'}</p>
              <p>Speed: {data.spd ? data.spd + 'kn' : 'n/a'}</p>
              <p>Altitude :{data.alt ? data.alt + 'ft' : 'n/a'}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      {loading && <h1>Loading...</h1>}

      <FlightDetails
        {...data} />
    </>
  )

}

