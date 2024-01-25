import React, { useEffect } from 'react'
import Countries from '../countries/Countries'
import NavBar from '../navBar/NavBar'
import { useDispatch } from 'react-redux'
import { setRefreshCountries } from '../../redux/actions/actions'

const HomePage = ({navigate, handleBackChange }) => {

    const dispatch = useDispatch()
    useEffect(()=>{
        handleBackChange("https://th.bing.com/th/id/R.d16b27fc5434c3c43cb832a565dd00f5?rik=uvmuvQFfe7Np7g&riu=http%3a%2f%2f3.bp.blogspot.com%2f_I9Td8HEdV-U%2fTPgOUGlQIVI%2fAAAAAAAAAA8%2fJeUlyWiWcUM%2fs1600%2fDSCN1091.JPG&ehk=utQR%2bA4P139u%2b6OO%2fG9lmXroSF8hpe1IsnbYxxOcP0k%3d&risl=&pid=ImgRaw&r=0");
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