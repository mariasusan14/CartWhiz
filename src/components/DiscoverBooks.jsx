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
    <div className="flex">
     <Sidebar />
      <div className="flex flex-col p-6 w-full ml-40">
        <h2 className="text-2xl font-semibold mb-4">Discover Books</h2>
        <div className="grid grid-cols-4 gap-4">
          {books.map((book) => (
            <div key={book.id} className="border rounded-lg overflow-hidden flex flex-col items-center">
              <Link to={`/book/${book.id}`} className="block">
                <img
                  src={book.imgURL}
                  alt={book.bookName}
                  className="w-full h-64 object-contain"
                />
              </Link>
              <p className="text-lg font-semibold p-2">{book.bookName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default DiscoverBooks;
