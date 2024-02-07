import React, { useEffect } from 'react'
import Countries from '../countries/Countries'
import NavBar from '../navBar/NavBar'
import { useDispatch } from 'react-redux'
import { setRefreshCountries } from '../../redux/actions/actions'

const HomePage = ({navigate, handleBackChange }) => {

    const dispatch = useDispatch()
    useEffect(()=>{
        handleBackChange("https://th.bing.com/th/id/R.addb993021dbc2b6dce3c08c9fae5020?rik=zCwl8h5kbZfwLg&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f04%2fBackgrounds-live-earth-wallpaper-HD.jpg&ehk=7Phj6V4bjsXJIVILKeGp%2bhDfyVmijJ9y7JS1k5u8nuc%3d&risl=1&pid=ImgRaw&r=0");
        // handleBackChange("https://images.pexels.com/photos/1249525/pexels-photo-1249525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
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