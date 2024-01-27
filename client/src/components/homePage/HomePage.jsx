import React, { useEffect } from 'react'
import Countries from '../countries/Countries'
import NavBar from '../navBar/NavBar'
import { useDispatch } from 'react-redux'
import { setRefreshCountries } from '../../redux/actions/actions'

const HomePage = ({navigate, handleBackChange }) => {

    const dispatch = useDispatch()
    useEffect(()=>{
        handleBackChange("https://static.vecteezy.com/system/resources/previews/000/107/293/original/grayscale-vector-worldmap.jpg");
        dispatch(setRefreshCountries())
    },[])

    return (
        <div>
            <div>
                <NavBar navigate={navigate} />
            </div>
            <div className='contain-countries'>
                <Countries navigate={navigate} />
            </div>
        </div>
    )
}

export default HomePage