import React from 'react'

const Country = ({ c, navigate }) => {
  return (
    <div className='country' onClick={() => navigate(`/country/${c.id}`)}>
      <div>
      <img src={c.flag} alt="" width={60} />
      </div>
      {c.capital ?
      <h3>{c.name} <br/> <small>({c.capital})</small></h3>
      : <h3>{c.name}</h3>
      }
      <p>{c.continent}</p>
    </div>
  )
}

export default Country