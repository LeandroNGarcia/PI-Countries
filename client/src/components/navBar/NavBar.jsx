import React, { useEffect } from 'react'
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { setActivities, setContinent, setCountries, setFilter, setOrder, setPage, setSearch, setSeason, setValueContinente, setValueFiltro, setValueOrden, setValueSeason } from '../../redux/actions/actions'
import "./NavBar.css"

const NavBar = ({ navigate }) => {
  const dispatch = useDispatch()
  const orden = useSelector((state) => state.values.orden)
  const filtro = useSelector((state) => state.values.filtro)
  const continente = useSelector((state) => state.values.continente)
  const season = useSelector((state) => state.values.season)
  const search = useSelector((state) => state.values.search)
  const activities = useSelector((state) => state.countries.activities)
  let activitiesName
  if (activities.length) {
    const actsSet = new Set(activities.map(activity => activity.name));
    activitiesName = Array.from(actsSet)
      .map(name => ({ name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

useEffect(() => {
    dispatch(setActivities())
  }, [])

  const resetFilter = () => {
    dispatch(setOrder("name", "asc"));
    dispatch(setContinent("todos"));
    dispatch(setCountries())
    dispatch(setValueOrden("name,asc"))
    dispatch(setValueContinente("todos"))
    dispatch(setValueFiltro(""))
    dispatch(setValueSeason(""))
    dispatch(setPage(1))
    dispatch(setSearch(""))
    document.getElementById("orden").value = "name,asc";
    document.getElementById("filtro").value = "";
    document.getElementById("continente").value = "todos";
    document.getElementById("season").value = "";
  }
  const handleOrder = (e) => {
    const [orderBy, order] = e.target.value.split(",");
    dispatch(setValueOrden(e.target.value))
    dispatch(setOrder(orderBy, order));
    dispatch(setPage(1))
  }
  const handleFilter = (e) => {
    const { value } = e.target;
    dispatch(setValueFiltro(e.target.value))
    dispatch(setValueOrden("name,asc"))
    dispatch(setValueContinente("todos"))
    dispatch(setPage(1))
    dispatch(setValueSeason(""))
    document.getElementById("season").value = "";
    document.getElementById("orden").value = "name,asc";
    document.getElementById("continente").value = "todos";
    document.getElementById("season").value = "";
    dispatch(setSearch(""))
    if (value === "") {
      return dispatch(setCountries())
    }
    dispatch(setFilter(value))
  }
  const handleSeason = (e) => {
    const { value } = e.target;
    dispatch(setValueSeason(value))
    dispatch(setSearch(""))
    if (value === "") {
      document.getElementById("filtro").value = "";
      dispatch(setValueFiltro(""))
      return dispatch(setCountries())
    }
    document.getElementById("orden").value = "name,asc";
    document.getElementById("continente").value = "todos";
    dispatch(setSeason(value))
    dispatch(setPage(1))
  }
  const handleContinent = (e) => {
    const { value } = e.target;
    if (value === "todos") {
      document.getElementById("filtro").value = "";
      dispatch(setValueFiltro(""))
    }
    document.getElementById("orden").value = "name,asc";
    dispatch(setValueOrden("name,asc"))
    dispatch(setValueContinente(e.target.value))
    dispatch(setContinent(value))
    dispatch(setPage(1))
  }
  return (
    <div className="nav-bar" role='menubar' >
      <button onClick={() => navigate("/")} style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
      title='Log Out'
      >
        <span className="material-icons">
          logout
        </span>
      </button>
      <button onClick={() => navigate("/activity-hub")} style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
      title='Activity Menu'
      >
        <span className="material-icons">
          menu
        </span>
      </button>
      <div>
        <Search />
      </div>
      <div style={{
        display: "flex",
        gap: "1em",
        justifyContent: "center",
        alingItems: "center"
      }}>
        <select name="orden" id="orden" defaultValue={orden} onChange={handleOrder} >
          <option value="name,asc">Nombre (A)</option>
          <option value="name,desc">Nombre (D)</option>
          <option value="population,desc">Mayor Poblacion</option>
          <option value="population,asc">Menor Poblacion</option>
        </select>
        <select name="filtro" id="filtro" onChange={handleFilter} disabled={activities.length === 0}
          title={activities.length === 0 ? 'No hay actividades disponibles' : ""}
          defaultValue={filtro} >
          <option value="" title='Sin Filtro'>Tipos de Actividad</option>
          <option value="tienen">Tienen Actividad</option>
          {activitiesName && activitiesName.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
        <select name="season" id="season" onChange={handleSeason} disabled={activities.length === 0 || filtro === ""}
          title={activities.length === 0 ? 'No hay actividades disponibles' : ""} defaultValue={season}>
          <option value="" title='Sin Filtro'>Temporada</option>
          <option value="Verano">Verano</option>
          <option value="Invierno">Invierno</option>
          <option value="Otoño">Otoño</option>
          <option value="Primavera">Primavera</option>
        </select>
        <select name="continente" id="continente" onChange={handleContinent} defaultValue={continente} >
          <option value="todos" title='Sin Filtro'>Continentes</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>
      </div>
      <button onClick={resetFilter} style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
      disabled={(orden === "name,asc" && filtro === "" && season === "" && continente === "todos" && search === "")}
      title='clear filters'
      >
        <span class="material-icons">
        restore
        </span>
      </button>
    </div>
  )
}

export default NavBar