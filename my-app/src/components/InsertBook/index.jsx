import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';


import './index.css'; // Import the CSS file

const InsertBookForm = () => {
  // State management for form fields
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [numberOfPages1, setNumberOfPages] = useState('');
  const [publishedYear1, setPublishedYear] = useState('');
  const [description, setDescription] = useState('');
  const [publisher, setPublisher] = useState('');
  const [bookCount1, setBookCount] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [chapters, setChapters] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let publishedYear = parseInt(publishedYear1)
    let bookCount = parseInt(bookCount1)
    let numberOfPages = parseInt(numberOfPages1)
    const bookData = {
  
      bookId:uuid(),
      bookName,
      author,
      numberOfPages,
      publishedYear,
      description,
      publisher,
      bookCount,
      imageUrl,
      chapters,
    };


      console.log(bookData)
      const url = "https://aec-cloud-book-backend.vercel.app/insert-book" 
      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
    };
    const response = await fetch(url,options)
    if (response.ok){
      console.log(1)
    }
  
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Insert New Book</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label className="form-label">Book Name:</label>
          <input
            type="text"
            className="form-input"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Author:</label>
          <input
            type="text"
            className="form-input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Number of Pages:</label>
          <input
            type="number"
            className="form-input"
            value={numberOfPages1}
            onChange={(e) => setNumberOfPages(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Published Year:</label>
          <input
            type="number"
            className="form-input"
            value={publishedYear1}
            onChange={(e) => setPublishedYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            className="form-input form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Publisher:</label>
          <input
            type="text"
            className="form-input"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Book Count:</label>
          <input
            type="number"
            className="form-input"
            value={bookCount1}
            onChange={(e) => setBookCount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Image URL:</label>
          <input
            type="url"
            className="form-input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Chapters:</label>
          <input
            type="text"
            className="form-input"
            value={chapters}
            onChange={(e) => setChapters(e.target.value)}
          />
        </div>
        <button className="form-button" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default InsertBookForm;
