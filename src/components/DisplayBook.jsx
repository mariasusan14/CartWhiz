import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db,auth } from '../config/firebase';
import './Display.css'

const DisplayBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [peopleReading, setPeopleReading] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isFinishReadingDisabled, setFinishReadingDisabled] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookRef = doc(db, 'book', id);
        const docSnap = await getDoc(bookRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBook({ id: docSnap.id, ...data });
          setPeopleReading(data.peopleReading || 0);
          setIsReading(data.readers && data.readers.includes(auth.currentUser.uid));
          setFinishReadingDisabled(!isReading);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id, isReading]);

  const handleReadClick = async () => {
    try {
      if (!isReading) {
        await updateDoc(doc(db, 'book', id), {
          peopleReading: peopleReading + 1,
          readers: [...(book.readers || []), auth.currentUser.uid],
        });

        setPeopleReading(peopleReading + 1);
        setIsReading(true);
        setFinishReadingDisabled(false);
      }
    } catch (error) {
      console.error('Error updating people reading:', error);
    }
  };

  const handleFinishReading = async () => {
    try {
      if (isReading) {
        await updateDoc(doc(db, 'book', id), {
          peopleReading: peopleReading - 1,
          readers: book.readers.filter((reader) => reader !== auth.currentUser.uid),
        });

        setPeopleReading(peopleReading - 1);
        setIsReading(false);
        setFinishReadingDisabled(true);
      }
    } catch (error) {
      console.error('Error updating people reading:', error);
    }
  };

  return (
    <div className='display'>
      <h2>{book.title}</h2>
      <img src={book.imgURL} alt={book.title} style={{ width: '50%', height: 'auto' }} />
      
      <p>Author: {book.author}</p>
      <p>Number of People Reading: {peopleReading}</p>
      <button onClick={handleReadClick} disabled={isReading}>I am reading this book</button>
      <button onClick={handleFinishReading} disabled={isFinishReadingDisabled}>Finish Reading</button>
      <br />
      <Link to="/discoverbooks">Back to Discover Books</Link>
      <Link to="/discoverbooks">Back to Discover Books</Link>
    </div>
  );
};

export default DisplayBook;

