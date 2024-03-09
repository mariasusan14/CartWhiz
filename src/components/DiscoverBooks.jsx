import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Sidebar from './Sidebar'; 
import './discoverbooks.css'; 

const DiscoverBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'book'));
        const booksData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="discover-books-container">
      <Sidebar />
      <div className="main-content">
        <h2 className="main-heading">Discover Books</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <Link to={`/book/${book.id}`} className="book-link">
                <img
                  src={book.imgURL}
                  alt={book.bookName}
                  className="book-image"
                />
                <p className="book-title">{book.bookName}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverBooks;
