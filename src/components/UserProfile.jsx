import React from 'react';
import Sidebar from './Sidebar';

const UserProfile = () => {
  return (
    <div className='flex '>
        <Sidebar/>
    <div className="p-4 bg-purple-100 ml-40 mr-4 mt-5">
      <div className="text-center mb-4">
        <h1 className="text-2xl">Profile Page</h1>
      </div>
      <div className="flex justify-center mb-4">
        <img
          className="rounded-full w-32 h-32"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
      </div>
      <div className="ml-4 text-center">
        <div className="flex flex-col">
          <p className="text-xl ">John Doe</p>
          <p className="text-gray-500">john.doe@example.com</p>
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
    </div></div>
  );
};

export default UserProfile;


