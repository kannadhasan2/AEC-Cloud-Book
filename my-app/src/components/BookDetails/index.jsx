import React from 'react'
import {Link}  from 'react-router-dom'
import './index.css'

const BookDetails = (books)=>{
    const {book} = books
    const {imageUrl,bookName ,bookId,description,author,publishedYear,language,numberOfPages,bookCount,publisher} = book 

    return (
        <li >
            <Link to={`/book/${bookId}`} className='book-details-container'>
            <img className='book-image' src={imageUrl}  /> 
            <div className='book-card-container'>
                <h1 className='book-main-heading'>{bookName}</h1>
                <p>Author: {author}</p>
                <p>No.of Pages: {numberOfPages}</p>
                <p>Book Count: {bookCount}</p>
                <p>Published Year: {publishedYear}</p>
                <p>Publisher: {publisher}</p>
            </div>
            </Link>
        </li>
    )
}

export default BookDetails