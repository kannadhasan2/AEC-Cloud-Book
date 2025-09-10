import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; 
import { DNA } from 'react-loader-spinner'
import './index.css'
const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const jwtToken = Cookies.get("jwtToken");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch("https://aec-cloud-book-nuq1.vercel.app/profile", options);
      if (response.ok) {
        const data = await response.json()
        const updatedData = {
            registerNo:data.register_no,
            username:data.username,
            dateOfBirth:data.date_of_birth,
            department:data.department,
            email:data.email
        }
        setData(updatedData)
      }
    } catch (err) {
      setError(err.message);  
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div className='profile-container'>
        {
            loading && <div className='loader'> 
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
             /> 
            </div>
        }
      {
        data !== null && 
        <div>
            <img alt="profile logo" className='profile-logo-image' src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1728831103/profile_kf20bw.png" /> 
            <p className='profile-data-text'>{data.username}</p>
            <p className='profile-data-text'>{data.registerNo}</p>
            <p className='profile-data-text'>{data.dateOfBirth}</p>
            <p className='profile-data-text'>{data.department}</p>
        </div>
      }
    </div>
  );
};

export default Profile;
