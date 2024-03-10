import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';import { collection, doc, getDocs, updateDoc, query, where,getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { isEmpty } from 'lodash';
import Sidebar from './Sidebar';
import Rating from 'react-rating';
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
    <div className='flex'>
    <Sidebar/>
  <div className='flex flex-row items-center'>
  <div className="container mx-auto px-4">
  <div className="flex flex-col items-center ml-40">
    <h2 className="text-2xl font-semibold">{book.title}</h2>
    <div className='border rounded-lg overflow-hidden flex flex-col items-center'>
    <img src={book.imgURL} alt={book.title} className="w-full h-64 object-contain" /></div>
    

    <p className="text-lg mt-7">Author: {book.author}</p>
    <p className="text-lg mt-5">Number of People Reading: {peopleReading}</p>
   <div className='mt-10'><Rating /></div>
    

  </div></div>
  <div className="flex flex-col items-center ml-40">
  <div className="text-center mt-5">
  <div className="flex justify-center mb-4"></div><div className="text-center mb-6 mt-5">
    <p>Rate the book!!!</p>
  </div>

   <Rating/>

  </div>
  <div className="text-center mt-5">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 h-48 w-96 flex items-center justify-center">
          <p className="p-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            venenatis commodo velit, id rutrum nulla consequat vel. Phasellus
            id enim et turpis ultrices cursus.
          </p>
        </div>
      </div>
    </div>
  <div className="flex mt-4">
      <button
        onClick={handleReadClick}
        disabled={isReading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
      >
        {isReading ? 'Reading...' : 'I am reading this book'}
      </button>
      <button
        onClick={handleFinishReading}
        disabled={isFinishReadingDisabled}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {isFinishReadingDisabled ? 'Finish Reading' : 'Already Read'}
      </button>
    </div>
    <button onClick={handleAddToTBR} disabled={isInTBR} className="bg-purple-500 text-white px-4 py-2 rounded-md mt-3">
        Add to TBR
      </button>
      <button onClick={handleRemoveFromTBR} disabled={!isInTBR} className="bg-purple-500 text-white px-4 py-2 rounded-md mt-3">
        Remove from TBR
      </button>
      <br />
  <div className="">
      <Link to="/discoverbooks" className="text-blue-500 mr-4">Back to Discover Books</Link>
     
    </div>
  </div>
  </div></div>
);
};

export default DisplayBook;

