import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

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
    <div>
      <h2>Discover Book</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {books.map((book) => (
          <div key={book.id} style={{ width: '25%', padding: '10px' }}>
            <Link to={`/book/${book.id}`}>
              <img
                src={book.imageUrl}
                alt={book.bookName}
                style={{ width: '100%', height: 'auto' }}
              />
              <p>{book.bookName}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverBooks;
