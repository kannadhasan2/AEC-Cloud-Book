import React from 'react'
import Navbar from '../Navbar'
import './index.css'

const Contact = ()=>{
    return (
        <>
        <Navbar />
        <div className='contact-container'>
            <h1>Contacts</h1>
            <img className='contact-image' src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1729659680/index.css_-_Project_-_Visual_Studio_Code_23-10-2024_10_28_55_l1zybz.png" alt="contact" />
        </div>
        </>
    )
}

export default Contact