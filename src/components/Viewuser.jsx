import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { px } from '@chakra-ui/breakpoint-utils';

const ViewUser = () => {
  const { userId: currentUserId } = useParams();
  console.log(currentUserId);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Query the user collection where userId matches
        const userQuery = query(collection(db, 'user'), where('userId', '==', currentUserId));
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
          // Iterate through user documents to find the correct user
          let userDocId = null;

          userQuerySnapshot.forEach((doc) => {
            if (doc.data().userId === currentUserId) {
              userDocId = doc.id;
            }
          });

          if (userDocId) {
            // Use the document ID of the matching user
            const userDocRef = doc(db, 'user', userDocId);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
              const fetchedUserData = userSnap.data();
              setUserData(fetchedUserData);
            } else {
              setError('User not found');
            }
          } else {
            setError('No matching user found with userId');
          }
        } else {
          setError('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('An error occurred while fetching user data');
      }
    };

    fetchUserData();
  }, [currentUserId]);

  return (
    <div>
      {userData && (
        <div>
          <h2>User Profile</h2>
          <img  src={userData.imgURL} alt="Profile" />
          <p>Fullname: {userData.fullName}</p>
          <p>Email: {userData.email}</p>
          <h3>Read List</h3>
          <ul>
            {userData.tobeRead &&
              userData.tobeRead.map((bookId) => <li key={bookId}>{bookId}</li>)}
          </ul>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default ViewUser;

