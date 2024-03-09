import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../services/firebase';

const DisplayBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [peopleReading, setPeopleReading] = useState(0);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const bookRef = firestore.collection('books').doc(id);

      try {
        const doc = await bookRef.get();

        if (doc.exists) {
          const data = doc.data();
          setBook(data);
          setPeopleReading(data.peopleReading || 0);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleReadClick = async () => {
    // Increment the number of people reading and update in Firestore
    try {
      await firestore.collection('books').doc(id).update({
        peopleReading: peopleReading + 1,
      });

      setPeopleReading(peopleReading + 1);
    } catch (error) {
      console.error('Error updating people reading:', error);
    }
  };

  const handleFinishReading = async () => {
    // Decrement the number of people reading and update in Firestore
    if (peopleReading > 0) {
      try {
        await firestore.collection('books').doc(id).update({
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
      {book && (
        <div>
          <h2>{book.title}</h2>
          <img src={book.cover} alt={book.title} style={{ width: '50%', height: 'auto' }} />
          <p>Author: {book.author}</p>
          <p>Number of People Reading: {peopleReading}</p>
          <button onClick={handleReadClick}>I am reading this book</button>
          <button onClick={handleFinishReading}>Finish Reading</button>
        </div>
      )}
    </div>
  );
};

export default DisplayBook;
