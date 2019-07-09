import React, { useState } from 'react'
import axios from 'axios'
import '../css/data.css'
import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons';

export default function Data() {

  const [data, setData] = useState([])

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
      setData(resp.data.ac)
    })
  }
  const datasort = (type) => {
    [].concat(data)
      .sort((a, b) => {
        if (a.type < b.type)
          return -1
        if (b.type > a.type)
          return 1
        return 0
      })
    setData(data)
  }



  return (
    <>
      <div>
        <button onClick={axiosGet}>Submit</button>
        <button onClick={() => datasort('cou')}>Countries</button>
        <section className='legend'>
          <p>Country</p>
          <p>ICAO</p>
          <p>Altitude</p>
          <p>Speed</p>
          <p>Last Reported</p>
          <p>Lat.</p>
          <p>Long.</p>

        </section>
        {data.map((m, index) => {

          return (
            <>
              <section className='data'>
                <p>{m.cou}</p>
                <p>{m.icao}</p>
                <p>{m.alt}</p>
                <p>{m.spd}</p>
                <p>{m.postime}</p>
                <p>{m.lat}</p>
                <p>{m.lon}</p>
              </section>
            </>
          )
        })
        }
      </div>
    </>

  )
}

