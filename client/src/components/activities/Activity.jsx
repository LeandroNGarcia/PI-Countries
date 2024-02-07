import axios from 'axios'
import React, { useState } from 'react'
import "./Activity.css"
import { useLocation } from 'react-router-dom'
import DetailActivity from '../detailActivity/DetailActivity'

const Activity = ({ a, countryId, navigate, position, updateActivity }) => {
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

  //?Para eliminar actividades sin paises asociados
  if (a.Countries) {
    if (a.Countries.length === 0) {
      const deleteAct = async () => {
        await axios.delete(`http://localhost:3001/activity/${a.id}`)
      }
      deleteAct();
    }
  }

  let styleBack = {
    backgroundImage: "",
    backgroundPosition: "center"
  }
  switch (a.name) {
    case "Buceo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      break;
    case "Alpinismo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      break;
    case "Festival":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/885288/pexels-photo-885288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      break;
    case "Crucero":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/7972421/pexels-photo-7972421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      break;
    case "Ciclismo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/733740/pexels-photo-733740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      break;
    case "Excursionismo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/3708444/pexels-photo-3708444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      break;
    case "Museo":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
      break;
    case "Deportes Invernales":
      styleBack.backgroundImage = "url(https://cdn.pixabay.com/photo/2016/11/18/15/40/boy-1835416_1280.jpg)"
      break;
    case "Pesca":
      styleBack.backgroundImage = "url(https://images.pexels.com/photos/2131967/pexels-photo-2131967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
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

  const [detailAct, setDetailAct] = useState(false);
  const handleDetailAct = () => {
      setDetailAct((prev) => !prev)
  }

  return (
    <>
      <div className='activity' style={styleBack} onMouseEnter={onMouseUp} onMouseLeave={onMouseDown}>
        <div onClick={handleDetailAct}>
          <span className='act-name'>Name</span>
          <h2>{a.name.length > 12 ? <small>{a.name}</small> :
            a.name}</h2>
        </div>
        <div onClick={handleDetailAct}>
          <span className='act-name'>Season</span>
          <h2>{a.season}</h2>
        </div>
        <div onClick={handleDetailAct}>
          <span className='act-name'>Duration</span>
          <h2>{a.duration === 0 ? "No tiene" : <div>{a.duration}<small>hs</small></div>}</h2>
        </div>
        <div onClick={handleDetailAct}>
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
              <h2>¿Estas seguro que quieres eliminar globalmente esta actividad?</h2>
              :
              <h2>¿Estas seguro que quieres eliminar esta actividad del pais?</h2>
            }
            <div className='eleccion-modal'>
              <button onClick={pathname === "/activity-hub" ? handleDeleteGlobal : handleDelete}>Si</button>
              <button onClick={handleModal}>No</button>
            </div>
          </div>
        </div>
      }
      {elimin &&
        <div className='contain-elimin'>
          <div className='elimin'>
            <h1>Actividad Eliminada Exitosamente</h1>
            <button onClick={() => { navigate("/home"); handleElimin() }}>OK</button>
          </div>
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
              <img src={c.flag} width={20} />
              <p style={{
                marginLeft: "5px"
              }}>{c.name}</p>
            </div>
          ))}
        </div>
        : ""
      }
      {detailAct ?
        <DetailActivity a={a} styleBack={styleBack} updateActivity={updateActivity} handleModal={handleModal} handleDetailAct={handleDetailAct} />
        : ""}
    </>
  )
}

export default Activity