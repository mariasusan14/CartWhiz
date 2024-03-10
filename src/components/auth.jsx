import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from '@firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaCheck, FaUserTag } from 'react-icons/fa';
import './auth.css';

export const Auth = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userRef = collection(db, 'user');

  const handleToggleMode = () => {
    setMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'));
    setError(null); // Clear any previous errors when toggling mode
  };

  const checkExistingAccount = async () => {
    const userQuery = query(userRef, where('email', '==', email));
    const querySnapshot = await getDocs(userQuery);

    return !querySnapshot.empty;
  };

  const validateSignUpFields = () => {
    return fullName && email && password && confirmPassword === password;
  };

  const submitUser = async () => {
    try {
      const existingAccount = await checkExistingAccount();

      if (existingAccount) {
        setError('Account already exists. Please log in or use a different email.');
      } else if (!validateSignUpFields()) {
        setError('Please fill in all fields and ensure passwords match.');
      } else {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Get the user's UID from the authentication result
        const userId = userCredential.user.uid;

        // Create user in Firestore with additional fields
        const userDocRef = await addDoc(userRef, {
          userId,
          fullName,
          email,
          password,
        });

        console.log('User document created in Firestore:', userDocRef.id);
        console.log('User signed up successfully!');
        navigate(`/dashboard/${userId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get the user's UID from the authentication result
      const userId = userCredential.user.uid;

      console.log('User logged in successfully!');
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      setError('Invalid email or password. Please try again.'); // Set login error message
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {mode === 'signup' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <FaUser className="inline mr-2" />
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <FaEnvelope className="inline mr-2" />
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <FaLock className="inline mr-2" />
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {mode === 'signup' && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <FaLock className="inline mr-2" />
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={mode === 'login' ? login : submitUser}
            >
              {mode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                onChange={handleToggleMode}
              />
              Create a new account
            </label>
          </div>
          {error && (
            <p className="text-red-500 text-xs italic mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};
