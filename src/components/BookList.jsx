import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, where, getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import Sidebar from './Sidebar';

const ToBeReadList = () => {
  const [tobeReadList, setToBeReadList] = useState([]);
  const userId = auth.currentUser.uid;
console.log(userId)
  useEffect(() => {
    const fetchToBeReadList = async () => {
      try {
        // Check if user ID is defined
        if (userId) {
          // Fetch the user document where userId matches
          const userQuerySnapshot = await getDocs(collection(db, 'user'), where('userId', '==', userId));

          if (!userQuerySnapshot.empty) {
            // Use the document ID of the first matching user
            const userDocId = userQuerySnapshot.docs[0].id;
            const userReference = doc(db, 'user', userDocId);

            const userSnap = await getDoc(userReference);

            if (userSnap.exists()) {
              const userData = userSnap.data();
              const tobeReadData = userData.readBooks || [];
              setToBeReadList(tobeReadData);
            } else {
              console.log('User document does not exist or is empty.');
            }
          } else {
            console.log('No user found with matching userId.');
          }
        } else {
          console.log('User ID is not defined. Not fetching To Be Read List.');
        }
      } catch (error) {
        console.error('Error fetching To Be Read List:', error);
      }
    };

    fetchToBeReadList();
  }, [userId]);

  const removeFromToBeRead = async (bookId) => {
    try {
      if (tobeReadList.includes(bookId)) {

        const userQuerySnapshot = await getDocs(collection(db, 'user'), where('userId', '==', userId));

        if (!userQuerySnapshot.empty) {
          // Use the document ID of the first matching user
          const userDocId = userQuerySnapshot.docs[0].id;
        const userRef = doc(db, 'user', userDocId);
        


        // Update the Firestore document
        await updateDoc(userRef, {
          tobeRead: tobeReadList.filter((id) => id !== bookId),
        });

        // Fetch the updated tobeRead array
        const updatedUserSnap = await getDoc(userRef);
        if (updatedUserSnap.exists()) {
          const updatedUserData = updatedUserSnap.data();
          const updatedTobeReadData = updatedUserData.readBooks || [];
          setToBeReadList(updatedTobeReadData);
        } else {
          console.log('Updated user document does not exist or is empty.');
        }
      }
    }
    } catch (error) {
      console.error('Error removing from To Be Read List:', error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar/>
      <h2 className="text-2xl ml-40 font-semibold">Read book List</h2>
      <div className="flex flex-col p-6 w-full ml-40">
      <ul>
        {tobeReadList.map((bookId) => ( 
          <li key={bookId}>
            {bookId}
            
          </li>
        ))}
      </ul></div>
    </div>
  );
};

export default ToBeReadList;


