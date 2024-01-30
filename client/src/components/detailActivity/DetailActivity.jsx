import React, { useState } from 'react'
import "../activities/Activity.css"
import { useLocation } from 'react-router-dom'
import { isDificult, isDuration } from '../homePage/validate'

const DetailActivity = ({ a, styleBack, handleModal, handleDetailAct, updateActivity }) => {

    const { pathname } = useLocation();

    const [editTable, setEditTable] = useState({
        id: a.id,
        name: a.name,
        season: a.season,
        duration: a.duration,
        dificult: a.dificult
    })

    const handleSaveEdit = async (e) => {
        e.preventDefault()
        if (!errors.duration && !errors.dificult) {
            updateActivity(editTable);
            return
        }
        alert("Corrige los errores para guardar")
    }

    const handleEdit = (e) => {
        const { name, value } = e.target;
        setEditTable({
            ...editTable,
            [name]: value
        });
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

    const [edit, setEdit] = useState(false)
    const [errors, setErrors] = useState({})
    const handleEditForm = () => {
        setEdit((prev) => !prev)
    }

    return (
        <div className='contain-detail-activity'>
            {edit && <h1>Edit Menu</h1>}
            {!edit ?
                <div className='activity-detail' style={styleBack}>
                    <div>
                        <span className='act-name'>Name</span>
                        <h2>{a.name.length > 12 ? <small>{a.name}</small> :
                            a.name}</h2>
                    </div>
                    <div>
                        <span className='act-name'>Season</span>
                        <h2>{a.season}</h2>
                    </div>
                    <div>
                        <span className='act-name'>Duration</span>
                        <h2>{a.duration === 0 ? "No tiene" : <div>{a.duration}<small>hs</small></div>}</h2>
                    </div>
                    <div>
                        <span className='act-name'>Dificult</span>
                        <h2>{a.dificult}</h2>
                    </div>
                    <button onClick={() => { handleModal(); handleDetailAct() }}>
                        <span class="material-icons">
                            delete_outline
                        </span>
                    </button>
                </div>
                :
                <div className='activity-detail-edit' style={styleBack}>
                    <div>
                        <span className='act-name'>Name</span>
                        <h2>{a.name.length > 12 ? <small>{a.name}</small> :
                            a.name}</h2>
                    </div>
                    <div>
                        <span className='act-name'>Season</span>
                        <select name="season" onChange={handleEdit} defaultValue={editTable.season}>
                            <option value="Verano">Verano</option>
                            <option value="Invierno">Invierno</option>
                            <option value="Primavera">Primavera</option>
                            <option value="Otoño">Otoño</option>
                        </select>
                    </div>
                    <div>
                        <span className='act-name'>Duration</span>
                        <input type='number' name='duration' value={editTable.duration} onChange={handleEdit} />
                    </div>
                    <div>
                        <span className='act-name'>Dificult</span>
                        <input type='number' name='dificult' value={editTable.dificult} onChange={handleEdit} />
                    </div>
                    <button onClick={handleSaveEdit}>
                        <span class="material-icons">
                            save_as
                        </span>
                        Guardar Cambios
                    </button>
                </div>
            }
            {errors &&
                <div className='contain-errors'>
                    <span className='errores-edit'>{errors.duration}</span>
                    <span className='errores-edit'>{errors.dificult}</span>
                </div>
            }
            <div style={{ display: "flex", gap: "4em", alignItems: "center" }}>
                <button onClick={handleDetailAct}>
                    <span class="material-icons">
                        clear
                    </span>
                    {edit ? "Cancelar" : "Cerrar"}
                </button>
                {pathname === "/activity-hub" && !edit ? <button onClick={handleEditForm}><span class="material-icons">
                    edit
                </span>Editar</button> : ""}
            </div>
        </div>
    )
}

export default DetailActivity