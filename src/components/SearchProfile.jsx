import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase'; // Assuming you have already set up Firebase and initialized the Firestore instance

const UserProfileSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      // Search for the user based on username or email
      const q = query(collection(db, 'users'), where('username', '==', searchTerm).orWhere('email', '==', searchTerm));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no user found, display an error message
        setSearchResult(null);
        setError('User not found');
      } else {
        // If user found, display the user profile data
        const userData = querySnapshot.docs[0].data();
        setSearchResult(userData);
        setError('');
      }
    } catch (error) {
      console.error('Error searching for user:', error);
      setError('An error occurred while searching for the user');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter username or email"
      />
      <button onClick={handleSearch}>Search</button>

      {searchResult && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {searchResult.username}</p>
          <p>Email: {searchResult.email}</p>
          {/* Display other user profile data here */}
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default UserProfileSearch;
