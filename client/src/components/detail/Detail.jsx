import axios from 'axios'
import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActivityBar from './ActivityBar'
import "./Detail.css"
import SkeletonActivity from '../skeletons/SkeletonActivity'


const Detail = ({ navigate, postActivity, handleBackChange }) => {
    const [country, setCountry] = useState({})
    const { id } = useParams()

    const Activity = React.lazy(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(import("../activities/Activity"))
            }, 220)
        });
    });

    useEffect(() => {
        handleBackChange("https://wallpapercrafter.com/desktop/5141-waves-dark-water-ripples-4k.jpg")
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3001/countries/${id}`).then(
            ({ data }) => {
                setCountry(data)
            }
        ).catch((error) => alert(error));
    }, [id])
    const [form, setForm] = useState(false)
    const handleForm = () => {
        setForm((prev) => !prev)
    }

    const { name, continent, capital, population, subRegion, flag, area, maps, Activities } = country
    return (
        <div className='contain-detail'>
            <div className='detail'>
                <div className='primary-content'>
                    <a href={maps} target="_blank" rel="noopener noreferrer">
                        <img src={flag} alt="" width={200} />
                    </a>
                    <span className='span-detail'>Country</span>
                    <h2>{name}</h2>
                    {capital ?
                        <>
                            <span className='span-detail'>Capital</span>
                            <h3>{capital}</h3>
                        </>
                        : ""}
                </div>
                <div className='secondary-content'>
                    <span className='span-detail'>Continent</span>
                    <h3>{continent}</h3>
                    {subRegion ?
                        <>
                            <span className='span-detail'>SubRegion</span>
                            <h4>{subRegion}</h4>
                        </>
                        : ""}
                    {population ?
                        <>
                            <span className='span-detail'>Population</span>
                            <h4>{population}</h4>
                        </>
                        : ""}
                    {area ?
                        <>
                            <span className='span-detail'>Area</span>
                            <h4>{area}</h4>
                        </>
                        : ""}
                </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw"
            }}>
                <div className='activity-bar' >
                    <h3>Actividades Turisticas</h3>
                    <button onClick={handleForm}>Agregar nueva actividad</button>
                </div>
                {form ?
                    <ActivityBar countryId={id} navigate={navigate} postActivity={postActivity} handleForm={handleForm} />
                    : ""
                }
            </div>
            {(Activities && Activities.length > 0) ?
                <div className='activities'>
                    <Suspense fallback={<SkeletonActivity />}>
                        {Activities.map((a) => (
                            <Activity key={a.id} a={a} countryId={id} navigate={navigate} />
                        ))}
                    </Suspense>
                </div>
            : "Agrega una actividad a este pais"}
            <button className='volverAtras' onClick={() => navigate("/home")}>Volver Atras</button>
        </div>
    )
}

export default Detail