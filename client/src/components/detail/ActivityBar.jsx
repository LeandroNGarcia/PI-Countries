import React, { useState } from 'react'
import "./ActivityBar.css"
import { isDificult, isDuration, isName } from '../homePage/validate';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ActivityForm = ({ countryId, navigate, postActivity, handleForm }) => {
    const { pathname } = useLocation()
    const [dataForm, setDataForm] = useState({
        name: "",
        season: "",
        dificult: 0,
        duration: 0,
        countryId: countryId ? countryId : "",
        countryId2: "",
        countryId3: ""
    });

    const activities = useSelector((state) => state.countries.activities)
    const countries = useSelector((state) => state.countries.allCountries)
    let activitiesName
    if (activities.length) {
        const actsSet = new Set(activities.map(activity => activity.name));
        activitiesName = Array.from(actsSet)
            .map(name => ({ name }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    const [errors, setErrors] = useState({})

    const handleData = (e) => {
        const { name, value } = e.target;
        setDataForm({
            ...dataForm,
            [name]: value
        })
        if (name === "name") {
            setErrors({
                ...errors,
                name: isName(value)
            })
        }
        if (name === "dificult") {
            setErrors({
                ...errors,
                dificult: isDificult(value)
            })
        }
        if (name === "duration") {
            setErrors({
                ...errors,
                duration: isDuration(value)
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!dataForm.name || !dataForm.season || dataForm.dificult === 0 || !dataForm.countryId) {
            alert("Complete el formulario")
            return;
        }
        if (!errors.name && !errors.season && !errors.duration && !errors.dificult) {
            handleForm()
            postActivity(dataForm)
            return;
        }
        alert("Corrija los errores")
    }

    return (
        <div className='contain-form'>
            <form onSubmit={handleSubmit} className={pathname === "/activity-hub" ? 'form-global' : 'form'} autoCorrect='false' autoComplete='false' method='post'>
                <label htmlFor="name">Nombre de la actividad</label>
                <input id='name' name='name' type="text" onChange={handleData} list="datalist" />
                <datalist id='datalist'>
                    {activitiesName.map((a) => (
                        <option value={a.name} />
                    ))}
                </datalist>
                <span className='span-error'>{errors.name}</span>
                <label htmlFor="season">Temporada donde se realiza</label>
                <select name="season" defaultValue="" onChange={handleData} >
                    <option value="">Seleccione Alguna</option>
                    <option value="Verano">Verano</option>
                    <option value="Invierno">Invierno</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Primavera">Primavera</option>
                </select>
                <label htmlFor="dificult">Dificultad de la actividad</label> <input id='dificult' name='dificult' type="number" onChange={handleData} />
                <span className='span-error'>{errors.dificult}</span>
                <label htmlFor="duration">Duracion de la actividad</label> <input id='duration' name='duration' type="number" onChange={handleData} />
                <span className='span-error'>{errors.duration}</span>
                {pathname === "/activity-hub" ?
                    <>
                        <br />
                        <label htmlFor="countries">¿Que paises quieres que tengan esta actividad?</label>
                        <select name="countryId" id="" onChange={handleData} defaultValue="">
                            <option value="" disabled>Todos los paises</option>
                            {countries.map((c) => (
                                <option value={c.id} disabled={c.id === dataForm.countryId2 || c.id === dataForm.countryId3}>{c.name}</option>
                            ))}
                        </select>
                        {(dataForm.countryId !== "") ?
                            <select name='countryId2' onChange={handleData} defaultValue="" >
                                <option value="">Ninguno</option>
                                {countries.map((c) => (
                                    <option value={c.id} disabled={c.id === dataForm.countryId || c.id === dataForm.countryId3} >{c.name}</option>
                                ))
                                }

                            </select>
                            : ""}
                        {(dataForm.countryId2) ?
                            <select name='countryId3' onChange={handleData} defaultValue="" >
                                <option value="">Ninguno</option>
                                {countries.map((c) => (
                                    <option value={c.id} disabled={c.id === dataForm.countryId || c.id === dataForm.countryId2} >{c.name}</option>
                                ))
                                }
                            </select>
                            : ""}
                        <br />
                    </>
                    : ""}
                <div className='button-post'>
                    <button type="submit">
                        <span class="material-icons">
                            add_circle
                        </span>
                        Añadir Actividad
                    </button>
                    <button onClick={handleForm}>
                        <span class="material-icons">
                            clear
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ActivityForm