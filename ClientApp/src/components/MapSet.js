// import React, { Component } from 'react'
// import axios from 'axios';
// import ReactMapGL, { Marker } from 'react-map-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'

// class MapSet extends Component {
//   state = {
//     viewport: {
//       latitude: 33.769135,
//       longitude: -101.948303,
//       width: '75vw',
//       height: '75vw',
//       zoom: 5
//     },
//     data: {}
//   }

//   // componentDidMount() {
//   //   this.axiosGet()
//   // }

//   axiosGet = () => {
//     axios(
//       {
//         method: 'GET',
//         url: 'https://adsbexchange-com1.p.rapidapi.com/icao/AE5965/',
//         headers:
//         {
//           'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com',
//           'X-RapidAPI-Key': 'fbd6ba527bmsha3e7a0dc93136f2p1915dejsnc0ffb99db3c0'
//         }
//       }
//     ).then(resp => {
//       console.log(resp.data.ac)
//       this.setState({ data: resp.data.ac })
//     })
//   }

//   render() {

//     return (
//       <>
//         <h1>hello</h1>
//         <ReactMapGL
//           {...this.viewport}
//           mapboxApiAccessToken={'pk.eyJ1IjoiZGRqYW5nbyIsImEiOiJjanh1bGoxbGExNmxnM21udmxlZDE0ZXd1In0.bJagpDIel0t0x73k748YtQ'}
//           mapStyle='mapbox://styles/ddjango/cjxuosfk59f2q1cntkdm8m9g6'
//           
//           onViewportChange={viewport => {
//             this.setState({ viewport })
//           }}
//         >
//           <Marker
//             latitude={33.769135}
//             longitude={-101.948303}
//           >
//             <p style={{ color: 'black' }}>Test</p>
//           </Marker>
//         </ReactMapGL>
//       </>
//     )
//   }
// }

// export default MapSet


  // const [data, setData] = useState({ latitude: 33.769135, longitude: -101.948303 })

  // useEffect(() => axiosGet)

  // const axiosGet = () => {
  //   axios(
  //     {
  //       method: 'GET',
  //       url: 'https://adsbexchange-com1.p.rapidapi.com/icao/AE5965/',
  //       headers:
  //       {
  //         'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com',
  //         'X-RapidAPI-Key': 'fbd6ba527bmsha3e7a0dc93136f2p1915dejsnc0ffb99db3c0'
  //       }
  //     }
  //   ).then(resp => {
  //     console.log(resp.data.ac)
  //     setData(resp.data.ac)
  //   })
  // }
