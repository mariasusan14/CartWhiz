import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Display.css';
import { collection, doc, getDocs, updateDoc, query, where,getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { isEmpty } from 'lodash';

const DisplayBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [peopleReading, setPeopleReading] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isFinishReadingDisabled, setFinishReadingDisabled] = useState(true);
  const [isInTBR, setIsInTBR] = useState(false);

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
          setIsInTBR(data.tobeRead && data.tobeRead.includes(book.title));
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id, isReading, book.title]);

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

  const handleAddToTBR = async () => {
    try {
      const userRef = collection(db, 'user');
      const userQuery = query(userRef, where('userId', '==', auth.currentUser.uid));
      const userSnapshot = await getDocs(userQuery);
  
      if (!isEmpty(userSnapshot.docs)) {
        const userDoc = userSnapshot.docs[0];
        if (!isInTBR && book.bookName) {
          await updateDoc(userDoc.ref, {
            tobeRead: [...(userDoc.data().tobeRead || []), book.bookName],
          });
  
          setIsInTBR(true);
        }
      } else {
        console.error('User document does not exist');
      }
    } catch (error) {
      console.error('Error adding to To Be Read List:', error);
    }
  };
  
  const handleRemoveFromTBR = async () => {
    try {
      const userRef = collection(db, 'user');
      const userQuery = query(userRef, where('userId', '==', auth.currentUser.uid));
      const userSnapshot = await getDocs(userQuery);
  
      if (!isEmpty(userSnapshot.docs)) {
        const userDoc = userSnapshot.docs[0];
        if (isInTBR && book.bookName) {
          await updateDoc(userDoc.ref, {
            tobeRead: userDoc.data().tobeRead.filter((bookName) => bookName !== book.bookName),
          });
  
          setIsInTBR(false);
        }
      } else {
        console.error('User document does not exist');
      }
    } catch (error) {
      console.error('Error removing from To Be Read List:', error);
    }
  };
  
  
  return (
    <div className='display'>
        <h2>{book.title}</h2>
      <img src={book.imgURL} alt={book.title} style={{ width: '50%', height: 'auto' }} />
      <p>{book.bookName}</p>
      <p>Author: {book.author}</p>
      <p>Number of People Reading: {peopleReading}</p>
      <button onClick={handleReadClick} disabled={isReading}>
        I am reading this book
      </button>
      <button onClick={handleFinishReading} disabled={isFinishReadingDisabled}>
        Finish Reading
      </button>
      <br />
      <button onClick={handleAddToTBR} disabled={isInTBR}>
        Add to TBR
      </button>
      <button onClick={handleRemoveFromTBR} disabled={!isInTBR}>
        Remove from TBR
      </button>
      <br />
      <Link to="/discoverbooks">Back to Discover Books</Link>
    </div>
  );
};

export default DisplayBook;


