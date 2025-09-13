import { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import Navbar from '../Navbar'
import Profile from '../Profile'
import BookDetails from '../BookDetails'
import './index.css'

const departmentFilterList = [
  {
    department: 'Computer Science & Engg.',
    departmentId: 'CSE',
  },
  {
    department: 'CSE - Cyber Security',
    departmentId: 'CSE&CS',
  },
  {
    department: 'Artificial Intelligence & DS',
    departmentId: 'AIDS',
  },
  {
    department: 'Artificial Intelligence & ML',
    departmentId: 'AIML',
  },
  {
    department: 'Information Technology',
    departmentId: 'IT',
  },
  {
    department: 'Electrical & Electronics Engg.',
    departmentId: 'EEE',
  },
  {
    department: 'Electronics & Communication Engg.',
    departmentId: 'ECE',
  },
  {
    department: 'Mechanical Engineering',
    departmentId: 'MECH',
  },
  {
    department: 'Civil Engineering',
    departmentId: 'CIVIL',
  },
  {
    department: 'Bio-Technology',
    departmentId: 'BIO',
  },
  {
    department: 'Chemical Engineering',
    departmentId: 'CHEM',
  },
]

const Books = () => {
  const [bookDetails, setBookDetails] = useState([])
  const [searchBook, setSearchBook] = useState('')
  const [isLoading ,setIsLoading] = useState(true)

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = async () => {
    const url = 'https://aec-cloud-book-nuq1.vercel.app/books'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.map(each => ({
        bookId: each.book_id,
        bookName: each.book_name,
        numberOfPages: each.number_of_pages,
        publishedYear: each.published_year,
        publisher: each.publisher,
        bookCount: each.book_count,
        imageUrl: each.image_url,
        author: each.author,
        description: each.description,
        chapters: each.chapters,
      }))
      setBookDetails(updatedData)
      setIsLoading(false)
    }
  }

  const getSearchValue = event => {
    setSearchBook(event.target.value.toLowerCase())
  }

  const filteredBooks = bookDetails.filter(each =>
    each.bookName.toLowerCase().includes(searchBook)
  )

  const checkBoxConst = (id, isChecked) => {
    // Functionality for handling checkbox selection
  }

  return (
    <div className="jobs-container">
      <Navbar />
      <div className="jobs-filter-profile-container">
        <div className="profile">
          <Profile />
          <hr  />
          <h1 className="tag-name">Departments</h1>
          <ul className="ul">
            {departmentFilterList.map(each => {
              const { departmentId } = each
              const check = event => {
                checkBoxConst(event.target.value, event.target.checked)
              }
              return (
                <li className="li-container" key={departmentId}>
                  <input
                    onChange={check}
                    name="check"
                    className="checkbox-input"
                    type="checkbox"
                    value={departmentId}
                    id={departmentId}
                  />
                  <label htmlFor={departmentId}>{each.department}</label>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="search-container">
          <div className="search-item-container">
            <input
              className="search"
              type="search"
              onChange={getSearchValue}
            />
            <button className="search-button" type="button" data-testid="searchButton">
              <BsSearch size={25} className="search-icon" />
            </button>
          </div>
          {filteredBooks.length === 0 && isLoading === false && (
            <div className="no-books">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no Books"
              />
              <h1>No Books Found</h1>
              <p>We could not find any books. Try other filters.</p>
            </div>
          )}
          {filteredBooks.length !== 0 && (
            <ul className="book-ul-container">
              {filteredBooks.map(eachBook => (
                <BookDetails book={eachBook} key={eachBook.bookId} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Books
