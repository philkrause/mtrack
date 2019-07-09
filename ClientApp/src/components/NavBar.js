import React from 'react'
import { Link } from 'react-router-dom'
import { faHome, faFighterJet, faPlane, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Header() {


  return (
    <>
      <section className='searcharea'>
        {/* <Link to={{ pathname: '/' }}> <img className='logo' src={legologo} /></Link> */}
        <Link to={{ pathname: '/' }}><p><FontAwesomeIcon icon={faHome} size='1x' /> Home</p></Link>
        <Link to={{ pathname: '/flightinfo' }}><p><FontAwesomeIcon icon={faPlane} size='1x' /> Flight Info</p></Link>
        <Link to={{ pathname: '/' }}><p><FontAwesomeIcon icon={faFighterJet} size='1x' /> Fighter Jets</p></Link>
        <Link to={{ pathname: '/' }}><p><FontAwesomeIcon icon={faQuestion} size='1x' /> Questions</p></Link>
        <div>
          <input
            placeholder='type search here'
            className='searchbox'
            type='text'
          />
        </div>
        <div>
          <button
            className='searchbutton'
          >Submit
          </button>
        </div>
      </section>
    </>
  )
}