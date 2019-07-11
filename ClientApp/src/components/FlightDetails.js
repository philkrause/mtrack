import React, { Component } from 'react'
// import { faThList } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment'



class FlightDetails extends Component {

  render() {
    return (
      <>

        <section className='one-flight'>

          <div>

            <p>Country: {this.props.cou ? this.props.cou : 'n/a'} </p>

            <p>Type: {this.props.type} </p>

            <p>Squawk: {this.props.sqk ? this.props.sqk : 'n/a'} </p>

            <p>ICAO: {this.props.icao ? this.props.icao : 'n/a'}</p>

            <p>OPICAO: {this.props.opicao ? this.props.opicao : 'n/a'}</p>
          </div>
          <div>
            <p>Speed: {this.props.spd ? this.props.spd + 'kn' : 'n/a'} </p>

            <p>Vertical Speed: {this.props.vsi ? this.props.vsi : 'n/a'} </p>

            <p>Altitude: {this.props.alt ? this.props.alt : 'n/a'}</p>

            <p>Wake Turbulence Category: {this.props.wtc ? this.props.wtc : 'n/a'}</p>
            <p>Track Angle: {this.props.trak ? this.props.trak + 'º' : 'n/a'} </p>
          </div>
          <div>
            <p>Latitude: {this.props.lat ? this.props.lat + 'º' : 'n/a'} </p>

            <p>Longitude: {this.props.lon ? this.props.lon + 'º' : 'n/a'} </p>
            <p><Moment fromNow="hh:mm:ss">{new Date(parseInt(this.props.postime))}</Moment></p>

            <p>GAltitude: {this.props.galt ? this.props.galt : 'n/a'} </p>

            <p>Transponder Type{this.props.trt}</p>
          </div>







        </section>
      </>
    )
  }
}

export default FlightDetails

