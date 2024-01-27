import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCountries } from '../../redux/actions/actions'
import "./Welcome.css"
import LandingPage from './LandingPage'

const WelcomePage = ({ navigate, handleBackChange }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleButton = () => {
    setLoading(true)
    dispatch(setCountries());
    setTimeout(() => {
      setLoading(false)
      navigate("/home")
    }, 3000)
  }
  useEffect(()=>{
    handleBackChange("/countries.png")
  },[])
  return (
    <>
      <div className='contain-welcome'>
        <h1 className='welcome-mes' id='wel-top'>Welcome to the World</h1>
        <h1 className='welcome-mes' data-testid= "wel-mid" id='wel-mid' onClick={handleButton}>Welcome to the World</h1>
        <h1 className='welcome-mes' id='wel-bot'>Welcome to the World</h1>
      </div>
      {loading &&
        <div className='contain-loading'>
          <LandingPage handleBackChange={handleBackChange} />
        </div>}
      <p style={{
        position:"absolute",
        bottom:".5em",
        zIndex:"-1"
      }}>@Copyright2024-<a style={{
        textDecoration:"none",
        color:"white"
      }} target="_blank" rel="noopener noreferrer" href='https://github.com/LeandroNGarcia'>LeandroNGarcia</a></p>
    </>
  )
}

export default WelcomePage