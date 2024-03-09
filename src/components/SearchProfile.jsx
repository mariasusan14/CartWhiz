import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase'; // Assuming you have already set up Firebase and initialized the Firestore instance

const SearchUserProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async () => {
    try {
      const q = query(collection(db, 'users'), where('username', '==', searchQuery));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for user:', error); 
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.map(user => (
          <div key={user.userId}>
            {/* <p>{user.username}</p> */}<p>{user.fullName}</p>
            <button onClick={() => handleSelectUser(user)}>View Profile</button>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {selectedUser.fullName}</p>
          <p>Email: {selectedUser.email}</p>
          {/* Display other profile details here */}
        </div>
      )}
    </div>
  );
};

export default SearchUserProfile;
