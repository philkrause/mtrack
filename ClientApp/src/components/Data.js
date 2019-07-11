import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'
import '../css/data.css'

export default function Data() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)



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
      if (localStorage)
        setData(resp.data.ac.filter(f => f.lat && f.lon))
      localStorage.setItem('myData', JSON.stringify(resp.data.ac.filter(f => f.lat && f.lon)))
      localStorage.setItem('timeStamp', new Date().getTime())
      setLoading(false)
    })
  }




  useEffect(() => {
    const storedTime = localStorage.getItem("timeStamp")
    const cachedData = localStorage.getItem("myData")
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

  return (
    <>
      <div>
        <section className='legend'>
          <button onClick={() => dataSort('cou')}>Military</button>
          <button onClick={() => dataSort('lon')}>Squawk</button>
          <button onClick={() => dataSort('icao')}>ICAO</button>
          <button onClick={() => dataSort('icao')}>Type</button>
          <button onClick={() => dataSort('alt')}>Alt</button>
          <button onClick={() => dataSort('spd')}>Spd</button>
          <button onClick={() => dataSort('postime')}>LastRep</button>
          <button onClick={() => dataSort('postime')}>Call</button>
          <button onClick={() => dataSort('lat')}>Lat</button>
          <button onClick={() => dataSort('lon')}>Long</button>
          <button onClick={() => dataSort('gnd')}>Grouded</button>

        </section>
        {loading && 'Loading...'}
        {data.map((m, index) => {

          return (
            <>
              <Link to={{ pathname: `/flightmap/${m.icao}` }} >
                <section className='data'>
                  <p>{m.cou ? m.cou : 'n/a'}</p>
                  <p>{m.sqk ? m.sqk : 'n/a'}</p>
                  <p>{m.icao ? m.icao : 'n/a'}</p>
                  <p>{m.type ? m.type : 'n/a'}</p>
                  <p>{m.alt ? m.alt + 'ft' : 'n/a'}</p>
                  <p>{m.spd ? m.spd + 'kn' : 'n/a'}</p>
                  <p><Moment fromNow="%d s">{new Date(parseInt(m.postime))}</Moment></p>
                  <p>{m.call ? m.call : 'n/a'}</p>
                  <p>{Number(m.lat).toFixed(5)}</p>
                  <p>{Number(m.lon).toFixed(5)}</p>
                  <p>{m.gnd > 0 ? 'True' : 'False'}</p>
                </section>
              </Link>
            </>
          )
        })
        }
      </div>
    </>

  )
}