import { React, useState, useEffect } from 'react';
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
          // Fetch the user documents where userId matches
          const userQuerySnapshot = await getDocs(collection(db, 'user'), where('userId', '==', userId));
    
          if (!userQuerySnapshot.empty) {
            // Iterate through user documents to find the correct user
            let userDocId = null;
    
            userQuerySnapshot.forEach((doc) => {  
              if (doc.data().userId === userId) {
                userDocId = doc.id;
              }
            });
    
            if (userDocId) {
              const userReference = doc(db, 'user', userDocId);
              const userSnap = await getDoc(userReference);
    
              if (userSnap.exists()) {
                const userData = userSnap.data();
                const tobeReadData = userData.tobeRead || [];
                setToBeReadList(tobeReadData);
              } else {
                console.log('User document does not exist or is empty.');
              }
            } else {
              console.log('No matching user found with userId.');
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
          // Iterate through user documents to find the correct user
          let userDocId = null;
  
          userQuerySnapshot.forEach((doc) => {
            if (doc.data().userId === userId) {
              userDocId = doc.id;
            }
          });
  
          if (userDocId) {
            const userRef = doc(db, 'user', userDocId);
  
            // Update the Firestore document
            await updateDoc(userRef, {
              tobeRead: tobeReadList.filter((id) => id !== bookId),
            });
  
            // Fetch the updated tobeRead array
            const updatedUserSnap = await getDoc(userRef);
            if (updatedUserSnap.exists()) {
              const updatedUserData = updatedUserSnap.data();
              const updatedTobeReadData = updatedUserData.tobeRead || [];
              setToBeReadList(updatedTobeReadData);
            } else {
              console.log('Updated user document does not exist or is empty.');
            }
          } else {
            console.log('No matching user found with userId.');
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
      <h2 className="text-2xl ml-40 font-semibold">To Read List</h2>
      {console.log(tobeReadList)} 
      <ul>
        {tobeReadList.map((bookId) => (
          <li key={bookId}>
            {bookId}
            <button onClick={() => removeFromToBeRead(bookId)} disabled={false}>
              Remove from To Be Read List
            </button>
          </li>
        ))}
      </ul>
    </div>
  );


};

export default ToBeReadList;




 



 


