// BookList.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";

const BookList = () => {
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userRef = doc(db, "user", user.uid);
        fetchData(userRef);
      } else {
        // User is signed out
        console.log("User is not signed in.");
      }
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchData = async (userRef) => {
    try {
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const readBooksData = data.readBooks || [];

        console.log("Data read from Firestore:", data);
        console.log("Read Books:", readBooksData);

        setReadBooks([...readBooksData]);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Read Books</h2>
      <ul>
        {readBooks.map((book, index) => (
          <li key={index}>{book}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
