import React, {useState, useEffect} from 'react'; 
import { useParams } from 'react-router-dom';
import './index.css';
import Navbar from '../Navbar';

const BookDetailedView = () => {
  const [booksData , setBookDetails] = useState({}) 
  const {bookId} = useParams()

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = async () => {
    
    const url = `https://aec-cloud-book-nuq1.vercel.app/book/${bookId}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        bookId: data.book_id,
        bookName: data.book_name,
        numberOfPages: data.number_of_pages,
        publishedYear: data.published_year,
        publisher: data.publisher,
        bookCount: data.book_count,
        imageUrl: data.image_url,
        author: data.author,
        description: data.description,
        chapters: data.chapters,
      }
      setBookDetails(updatedData)
    }
  }
const {imageUrl , description, bookCount,bookName,chapters,author,numberOfPages,publishedYear,publisher} = booksData
let chapterList =""
console.log(chapters)
if (typeof chapters === 'string') {
  chapterList = chapters.split("#") 
} 
console.log(chapterList)
  return (
    <>
    <Navbar />
    <div className='book-detailed-view'>
    <div className="book-details-container-main">
     <div className='main-book-head'>
     <img className='book-image' src={imageUrl}  /> 
            <div className='book-card-container'>
                <h1>{bookName}</h1>
                <p>Author: {author}</p>
                <p>No.of Pages: {numberOfPages}</p>
                <p>Book Count: {bookCount}</p>
                <p>Published Year: {publishedYear}</p>
                <p>Publisher: {publisher}</p>
            </div>
            
     </div>
     <div className='chapter'>
     <ul >
      { chapterList.length !== 0 && (
        chapterList.map((each,index) => <li><span className='chapter-text'>Chapter {index+1}:</span> {each}</li>))
      }
     </ul>
     </div>
     <h1>Description:</h1>
     <p>{description}</p>
    </div>
    </div>
    </>
  );
}



export default BookDetailedView;
