import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const DisplayBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [peopleReading, setPeopleReading] = useState(0);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookRef = doc(db, 'book', id);
        const docSnap = await getDoc(bookRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBook({ id: docSnap.id, ...data });
          setPeopleReading(data.peopleReading || 0);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleReadClick = async () => {
    try {
      await updateDoc(doc(db, 'book', id), {
        peopleReading: peopleReading + 1,
      });

      setPeopleReading(peopleReading + 1);
    } catch (error) {
      console.error('Error updating people reading:', error);
    }
  };

  const handleFinishReading = async () => {
    if (peopleReading > 0) {
      try {
        await updateDoc(doc(db, 'book', id), {
          peopleReading: peopleReading - 1,
        });

        setPeopleReading(peopleReading - 1);
      } catch (error) {
        console.error('Error updating people reading:', error);
      }
    }
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.imgURL} alt={book.title} style={{ width: '50%', height: 'auto' }} />
      
      <p>Author: {book.author}</p>
      <p>Number of People Reading: {peopleReading}</p>
      <button onClick={handleReadClick}>I am reading this book</button>
      <button onClick={handleFinishReading}>Finish Reading</button>
      <br />
      <Link to="/discoverbooks">Back to Discover Books</Link>
    </div>
  );
};

export default DisplayBook;
