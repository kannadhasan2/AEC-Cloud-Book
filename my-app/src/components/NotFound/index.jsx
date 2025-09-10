import React from 'react'
import Navbar  from '../Navbar'
import './index.css'

const NotFound = () =>{
    return (
        <>
            <Navbar />
            <div className='not-found-container'>
                <img className='not-found-image' src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png" alt="not found" />
                <h1 className='not-found-heading'>Page Not Found</h1>
                <p className='not-found-paragraph'>We are sorry, the page you requested could not be found.</p>
            </div>
        </>
    )
}

export default NotFound