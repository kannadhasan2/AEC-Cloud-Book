
import react , {useState} from 'react'
import Navbar from '../Navbar'
import './index.css'

const sem = [
    {
        sem:"SEMESTER - III",
        semId:3
    } ,
    {
        sem:"SEMESTER - IV",
        semId:4
    } ,
    {
        sem:"SEMESTER - V",
        semId:5
    } ,
    {
        sem:"SEMESTER - VI",
        semId:6
    } ,
    {
        sem:"SEMESTER - VII",
        semId:7
    } ,
    {
        sem:"SEMESTER - VIII",
        semId:8
    } 
]

const semBookDetails = [
    {
        bookName:"Foundation Of Data Science",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:3
    },
    {
        bookName:"Data Structures",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:3
    },{
        bookName:"Object Oriented Programming",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:3
    },{
        bookName:"Digital Principle and Computer Organization",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:3
    },
    {
        bookName:"Discrete Mathematics",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:3
    },
    {
        bookName:"Artificial Intelligence & Machine Learning",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:4
    },
    {
        bookName:"Algorithms",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:4
    },
    {
        bookName:"Theory Of Computation",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:4
    },
    {
        bookName:"Operating System",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:4
    },
    {
        bookName:"Database Management System",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:4
    },
    {
        bookName:"Environmental Science & Sustainability",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:4
    },
    {
        bookName:"Computer Networks",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:5
    },
    {
        bookName:"Compiler Design",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:5
    },
    {
        bookName:"Cryptography & Cyber Security",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:5
    },
    {
        bookName:"Distributed Computing",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:5
    },
    {
        bookName:"Data Warehousing",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:5
    },
    {
        bookName:"Cloud Computing",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:5
    },
    {
        bookName:"Object Oriented Software Engineering",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:6
    },
    {
        bookName:"Embedded System and IOT",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:6
    },
    {
        bookName:"Human Values And Ethics",
        pdfUrl:"https://drive.google.com/file/d/1EdvJkN5k-MM2WNsdZ-k8WjPFNPZ_ieCn/view?usp=sharing",
        sem:7
    },
  
]

const SemBooks = ()=>{
    const [activeSem, setActiveSemId] = useState(3)
    
    const getSemId = (id) =>{
        setActiveSemId(id)
    }
    
    const filteredSemBooks = semBookDetails.filter((each) => each.sem === activeSem)
    return (
        <>
            <Navbar /> 
            <ul className='sem-book-container'>
                {
                    sem.map(each => {
                        const isActive = each.semId === activeSem 
                        const className = isActive? "active" : ""
                        return (
                            <li className={`sem-list ${className}`} key = {each.semId}>
                                <button className={`sem-button ${className}`}  onClick={()=> getSemId(each.semId)}>{each.sem}</button></li>
                        )
                    })
                }
            </ul>
            <ul className='sem-book-container-two'>
            {
                filteredSemBooks.map((each) => <li className='sem-list' key={each.bookName}>
                    <h1>{each.bookName}</h1>
                    <a  href={each.pdfUrl} target="_blank">Download Here</a>
                </li>)
            }
            </ul>
         
        </>
    )
} 

export default SemBooks