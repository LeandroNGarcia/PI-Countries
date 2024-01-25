import React, { useEffect } from 'react'
import "./Welcome.css"

const LandingPage = ({ handleBackChange }) => {

  useEffect(()=>{
    handleBackChange("/countries.png")
  },[])

  return (
    <div className='loading-contain'>
        <div className='loading'></div>
        <p>Loading...</p>
    </div>
  )
}

export default LandingPage
