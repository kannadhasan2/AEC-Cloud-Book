import React from 'react'
import Navbar from '../Navbar'
import './index.css'

const departmentDataBE = [
   
"Computer Science and Engineering",
"CSE-Cyber Security",
"Artificial Intelligence & Machine Learning",
"Electronics and Communication Engg",
"Electrical and Electronics Engineering",
"Civil Engineering",
"Mechanical Engineering"

]

const DepartmentDataBtech = [
    "Agricultural Engineering",
"Artificial Intelligence and Data Science   ",
"Bio Technology",
"Chemical Engineering",
"Information Technology"
]

const Departments = () =>{
    return (
        <>
        <Navbar />
        <div className='department-container'>
            <h1>BE</h1>
            <ul>
            {
                departmentDataBE.map((eachDepartment)=> <li className='departments' key={eachDepartment}>{eachDepartment}</li>)
            }
            </ul>
            <h1>BTECH</h1>
            <ul>
            {
                DepartmentDataBtech.map((eachDepartment)=> <li className='departments' key={eachDepartment}>{eachDepartment}</li>)
            }
            </ul>
        </div>
        </>
    )
}

export default Departments