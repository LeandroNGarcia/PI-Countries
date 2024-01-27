import React from 'react'
import { setByName, setPage, setSearch, setValueContinente, setValueFiltro, setValueOrden, setValueSeason } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
  const search = useSelector((state) => state.values.search)
  const countries = useSelector((state) => state.countries.allCountries)
  const dispatch = useDispatch()
  const handleSearch = (e) => {
    const { value } = e.target;
    dispatch(setByName(value))
    dispatch(setSearch(value))
    dispatch(setPage(1))
    dispatch(setValueOrden("name,asc"))
    dispatch(setValueContinente("todos"))
    dispatch(setValueFiltro(""))
    dispatch(setValueSeason(""))
    document.getElementById("orden").value = "name,asc";
    document.getElementById("filtro").value = "";
    document.getElementById("continente").value = "todos";
    document.getElementById("season").value = "";
  }
  return (
    <div>
      <input type="search" placeholder='Escribe un nombre...' name="buscar" id="search" onChange={handleSearch} value={search} list='data-list' style={{ appearance: "none" }} />
      <datalist id='data-list'>
        {countries.map((c) => (
          <option value={c.name}>{c.name}</option>
        ))}
      </datalist>
    </div>
  )
}

export default Search