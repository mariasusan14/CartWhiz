import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import Sidebar from './Sidebar';
import Rating from 'react-rating';


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
    <div className="flex justify-center mb-4"></div>


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
      
    <div className="mt-4">
        <Link to="/discoverbooks" className="text-blue-500 mr-4">Back to Discover Books</Link>
       
      </div>
    </div>
    </div></div>
  );
};

export default DisplayBook;
