import React  from 'react'
import {Chrono} from 'react-chrono'

import Navbar from '../Navbar';
import './index.css'

const items = [
    { title: '1993' },
    { title: '1994' },
    { title: '1995' },
    { title: '2000' },
    { title: '2002' },
    { title: '2006' },
    { title: '2010' },
    { title: '2015' },
    { title: '2018' },
    { title: '2020' },
    { title: '2023' }
];
const arunaiEngineeringCollegeTimeline = [
    { title: '1993',
        heading: 'Establishment of Arunai Engineering College', 
        description: 'Founded in Tiruvannamalai, Tamil Nadu, India, to provide quality engineering education.' 
    },
    { title: '1994',
        heading: 'Inception of Academic Programs', 
        description: 'The college began offering undergraduate programs in various engineering disciplines, including Civil, Mechanical, and Electrical Engineering.' 
    },
    { title: '1995',
        heading: 'First Batch Graduates', 
        description: 'The first batch of engineering students graduated, marking a significant milestone for the institution.' 
    },
    { title: '2000',
        heading: 'Accreditation by NBA', 
        description: 'Several programs received accreditation from the National Board of Accreditation (NBA), enhancing the college\'s reputation.' 
    },
    { title: '2002',
        heading: 'Introduction of Postgraduate Programs', 
        description: 'The college introduced M.Tech programs in various specializations to cater to the growing demand for advanced technical education.' 
    },
    { title: '2006',
        heading: 'Establishment of Research Centers', 
        description: 'Research centers were established to promote innovation and research activities among faculty and students.' 
    },
    { title: '2010',
        heading: 'National Recognition', 
        description: 'The college gained national recognition for its academic excellence and was featured in various educational rankings.' 
    },
    { title: '2015',
        heading: 'International Collaborations', 
        description: 'Arunai Engineering College established collaborations with international universities for student exchange programs and research initiatives.' 
    },
    { title: '2018',
        heading: 'New Infrastructure Development', 
        description: 'The college inaugurated new state-of-the-art laboratories and facilities to enhance the learning experience for students.' 
    },
    { title: '2020',
        heading: 'Online Learning Initiatives', 
        description: 'In response to the COVID-19 pandemic, the college successfully transitioned to online learning, ensuring continuity in education.' 
    },
    { title: '2023' ,
        heading: 'Silver Jubilee Celebrations', 
        description: 'The college celebrated its 25th anniversary with various events showcasing its achievements, alumni contributions, and future goals.' 
    }
]; 

const Timeline = ()=>{

    return (
        <>
           <Navbar /> 
           <p className='empty'>*</p>
            <div className='time-line-container'>
                <Chrono   slideShowType="reveal" mode="VERTICAL_ALTERNATING" items={items}   slideShow  slideItemDuration={4500}  >
                    {
                        arunaiEngineeringCollegeTimeline.map((each) =>(
                            <div key={each.heading} >
                                <h1 className='time-line-year'>{each.title}</h1>
                                <h1 className='time-line-heading'>{each.heading}</h1>
                                <p className='time-line-description'>{each.description}</p>
                            </div>
                        ))
                    }
                </Chrono>
            </div>
        </>
    )
}

export default Timeline