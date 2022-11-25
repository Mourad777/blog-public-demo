import React from 'react'

export default ({color}) => (
    <div
        className="lds-ellipsis"
        style={{ margin: "auto", display: "block" }}
    >
        <div style={{background:!!color ? color : '#fff'}}></div>
        <div style={{background:!!color ? color : '#fff'}}></div>
        <div style={{background:!!color ? color : '#fff'}}></div>
        <div style={{background:!!color ? color : '#fff'}}></div>
    </div>
)