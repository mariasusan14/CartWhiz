import React, { useEffect, useState } from 'react';
import { doc, getDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import Sidebar from './Sidebar';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    fullName: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = collection(db, 'user');
        const userQuery = query(userRef, where('userId', '==', auth.currentUser.uid));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.size === 1) {
          const userData = userSnapshot.docs[0].data();
          setUserDetails({
            email: userData.email,
            fullName: userData.fullName,
          });
        } else {
          console.error('User document not found or multiple documents found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className=" bg-purple-100 h-screen mr-4">
    <Sidebar/>
      <div className="text-center mb-4">
        <h1 className="text-2xl">Profile Page</h1>
      </div>
      <div className="flex justify-center mb-4">
        <img
          className="rounded-full w-32 h-32"
          src="https://bit.ly/dan-abramov"
          alt="Profile"
        />
      </div>
      <div className="ml-4 text-center">
        <div className="flex flex-col">
          <p className="text-xl">{userDetails.fullName}</p>
          <p className="text-gray-500">{userDetails.email}</p>
        </div>
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
    </div>
  );
};

export default UserProfile;
