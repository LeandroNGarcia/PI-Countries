import React from 'react'
import "./SkeletonAnimation.css"

const SkeletonCountry = () => {
  return (
    <div className='skeletonAnimation' style={styles.contain}>
      <div className='skeletonItemAnimation' style={styles.flag}></div>
      <div style={{
        gap:".5em",
        display:"flex",
        flexDirection:"column"
      }}>
        <div className='skeletonItemAnimation' style={styles.items}></div>
        <div className='skeletonItemAnimation' style={styles.items}></div>
      </div>
      <div style={{
        marginBottom:"1.5em"
      }}>
      <div className='skeletonItemAnimation' style={styles.items}></div>
      </div>
    </div>
  )
}

export default SkeletonCountry

const styles = {
  contain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "10em",
    gap: "2.5em",
    padding: ".7em",
    height: "14em"
  },
  flag: {
    width: "4.5em",
    height: "3em"
  },
  items: {
    width: "5em",
    height: "1em"
  }
}