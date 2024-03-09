// BookList.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase"; 

const BookList = () => {
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userRef = db.collection("users").doc(user.uid);

      userRef
        .get()
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setReadBooks(data.readBooks || []);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error.message);
        });
    }
  }, []);

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
