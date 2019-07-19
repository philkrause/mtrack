import React from 'react'
import { Link } from 'react-router-dom'
import { faHome, faFighterJet, faPlane, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Header() {


  return (
    <>
      <div className='title'>
        <h2>  Military Flight Tracker</h2>
      </div>
      <section className='header'>
        <Link to={{ pathname: '/' }}><p><FontAwesomeIcon icon={faHome} size='1x' /> Home</p></Link>
        <Link to={{ pathname: '/info' }}><p><FontAwesomeIcon icon={faPlane} size='1x' /> Flight Info</p></Link>
        <Link to={{ pathname: '/userflighthistory' }}><p text="Each time you select a flight it's data is stored in your profile"><FontAwesomeIcon icon={faFighterJet} size='1x' /> My Flight History</p></Link>
        <Link to={{ pathname: '/about' }}><p><FontAwesomeIcon icon={faQuestion} size='1x' /> About</p></Link>
        <div>
          {/* <input
              placeholder='type search here'
              className='searchbox'
            type='text'
          /> */}
        </div>
        <div>
          {/* <button
            className='searchbutton'
          >Submit
          </button> */}
        </div>
      </section>


    </>
  )
}