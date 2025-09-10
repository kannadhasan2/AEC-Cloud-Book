import { IoMdMenu } from "react-icons/io";

import {Link,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import "./index.css"

const Navbar = () => {
    const navigate = useNavigate()
    const menuClicked = () => {
        const navbar = document.querySelector('.navbar');
        const navBg = document.querySelector('.nav-bg');
        navbar.classList.toggle('active');
        navBg.classList.toggle('active');
      };
      

    const logout = () =>{
        Cookies.remove("jwtToken")
        navigate("/login",{replace:true} )
    }

    return(
        <>
    <header className="header">
        

        <div  className="logo">
            <img src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1728572662/Pngtree_book_logo_and_certificate_vector_15169356_hqsdq3.png" className="logo-image" />
            <p>AEC</p>
        </div>
        <button className="menu-button" onClick={menuClicked}><IoMdMenu id="menu-icon" /></button>
        <nav className="navbar">
            <Link to="/"><span >Home</span></Link>
            <Link to="/departments"><span >Departments</span></Link>
            <Link to="/books"><span >Books</span></Link>
            <Link to="/timeline"><span >Timeline</span></Link>
            <Link to="/contact"><span>Contact</span></Link>
        <Popup className="pop-up-container"
                modal
                trigger={
                   
                        <button  className="logout-button">Logout</button>
                   
                }
            >
                {close => (
                <>
                    <div className="pop-up-container">
                    <h1 className="logout-text">Are you sure you want to log out?</h1>
                    <div className="logout-button-container">
                    <button
                    type="button"
                    className="trigger-button"
                    onClick={() => close()}
                    >
                    Cancel
                    </button>
                    <button onClick={logout}  className="logout-button logout">Logout</button>
                    </div>
                
                    </div>
                    </>
                )}
        </Popup>
            
        </nav>
            </header>
    <div className="nav-bg"></div> 
    </>
)
}

export default Navbar