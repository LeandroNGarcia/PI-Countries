import axios from 'axios'
import React, { useState } from 'react'
import "./Activity.css"
import { useLocation } from 'react-router-dom'

const Activity = ({ a, countryId, navigate, position }) => {
  const [modal, setModal] = useState(false)
  const [elimin, setElimin] = useState(false)
  const { pathname } = useLocation()
  const handleModal = () => {
    setModal((prev) => !prev)
  }
  const handleElimin = () => {
    setElimin((prev) => !prev)
  }
  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:3001/activity", { params: { countryId, activityId: a.id } })
      handleModal()
      handleElimin()
    } catch (error) {
      alert(error)
    }
  }

  const handleDeleteGlobal = async () => {
    try {
      await axios.delete(`http://localhost:3001/activity/${a.id}`)
      handleModal()
      handleElimin()
    } catch (error) {
      alert(error)
    }
  }

  let styleBack = {
    backgroundImage: "",
    color: "white"
  }
  switch (a.name) {
    case "Buceo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg?auto=compress&cs=tinysrgb&w=600)"
      break;
    case "Alpinismo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=600)"
      break;
    case "Festival":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/1317374/pexels-photo-1317374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      break;
    case "Crucero":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg?auto=compress&cs=tinysrgb&w=600)"
      break;
    case "Ciclismo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/733740/pexels-photo-733740.jpeg?auto=compress&cs=tinysrgb&w=600)"
      break;
    case "Excursionismo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/1009355/pexels-photo-1009355.jpeg?auto=compress&cs=tinysrgb&w=600)"
      break;
    case "Museo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/375882/pexels-photo-375882.jpeg?auto=compress&cs=tinysrgb&w=600)"
      break;
    case "Deportes Invernales":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/284949/pexels-photo-284949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      break;
    default:
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/5405596/pexels-photo-5405596.jpeg?auto=compress&cs=tinysrgb&w=600)"
      break;
  }

  const [view, setView] = useState(false)

  const onMouseUp = () => {
    setView(true)
  }
  const onMouseDown = () => {
    setView(false)
  }

  return (
    <>
      <div className='activity' style={styleBack} onMouseEnter={onMouseUp} onMouseLeave={onMouseDown}>
        <div>
        <span className='act-name'>Name</span>
        <h2>{a.name}</h2>
        </div>
        <div>
        <span className='act-name'>Season</span>
        <h2>{a.season}</h2>
        </div>
        <div>
        <span className='act-name'>Duration</span>
        <h2>{a.duration}</h2>
        </div>
        <div>
        <span className='act-name'>Dificult</span>
        <h2>{a.dificult}</h2>
        </div>
        <button onClick={handleModal}>
          <span class="material-icons">
            delete_outline
          </span>
        </button>
      </div>
      {modal &&
        <div className='contain-modal'>
          <div className='modal'>
            {pathname === "/activity-hub" ?
              <h2>¿Seguro deseas eliminar globalmente esta actividad?</h2>
              :
              <h2>¿Seguro que quieres eliminar esta actividad del pais?</h2>
            }
            <div className='eleccion-modal'>
              <button onClick={pathname === "/activity-hub" ? handleDeleteGlobal : handleDelete}>Si</button>
              <button onClick={handleModal}>No</button>
            </div>
          </div>
        </div>
      }
      {elimin &&
        <div className='elimin'>
          <h1>Actividad Eliminada Exitosamente</h1>
          <button onClick={() => { navigate("/home"); handleElimin() }}>OK</button>
        </div>
      }
      {(view & pathname === "/activity-hub") ?
        <div className='view' style={{
          left: `${position.x - 250}px`,
          top: `${position.y - 150}px`
        }} >
          <p>{a.Countries.length === 1 ? "Pais" : "Paises"} con esta actividad:</p>
          {a.Countries.map((c) => (
            <div key={c.id} className='view-item'>
              <img src={c.flag} width={20}/>
              <p style={{
                marginLeft: "5px"
              }}>{c.name}</p>
            </div>
          ))}
        </div>
        : ""
      }
    </>
  )
}

export default Activity