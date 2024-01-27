import React from 'react'
import "./SkeletonAnimation.css"

const SkeletonActivity = () => {
  return (
    <div className="skeletonAnimation" style={{
      width: "37em",
      display: "flex",
      height: "5em",
      margin: "1em",
      borderRadius: "30px",
      padding: "1em 1.5em",
      justifyContent: "center",
      alignItems: "center",
      gap: "1.8em"
    }}>
      <div style={containItemStyle}>
        <div className="skeletonItemAnimation" style={itemStyle.itemName}></div>
        <div className="skeletonItemAnimation" style={itemStyle.item}></div>
      </div>
      <div style={containItemStyle}>
        <div className="skeletonItemAnimation" style={itemStyle.itemName}></div>
        <div className="skeletonItemAnimation" style={itemStyle.item}></div>
      </div>
      <div style={containItemStyle}>
        <div className="skeletonItemAnimation" style={itemStyle.itemName}></div>
        <div className="skeletonItemAnimation" style={itemStyle.item}></div>
      </div>
      <div style={containItemStyle}>
        <div className="skeletonItemAnimation" style={itemStyle.itemName}></div>
        <div className="skeletonItemAnimation" style={itemStyle.item}></div>
      </div>
      <div className="skeletonItemAnimation" style={itemStyle.button}></div>
    </div>
  )
}

const containItemStyle = {
  display:"flex",
  flexDirection:"column",
  gap:"1em",
  justifyContent:"center",
  alignItems:"center",
}

const itemStyle = {
  itemName: {
    width: "2em",
    height: "1em"
  },
  item:{
    width: "4em",
    height: "1em"
  },
  button:{
    width:"3em",
    height:"3em"
  }
}

export default SkeletonActivity;