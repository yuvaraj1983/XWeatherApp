import React from 'react'
import  "./Card.css";

const Card = ({name, value}) => {
  return (
    <div className='weather-card'>
        <h4>{name}</h4>
        <p>{value}</p>
    </div>
  )
}

export default Card