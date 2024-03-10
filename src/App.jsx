import { Auth } from './components/auth';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DiscoverBooks from './components/DiscoverBooks';
import BookList from './components/BookList';
import ToBeReadList from './components/ToBeReadList';
import GroupChat from './components/GroupChat';
import UserProfile from './components/UserProfile';
import { ChakraProvider } from '@chakra-ui/provider';
import DisplayBook from './components/DisplayBook';
import ViewUser from './components/Viewuser'; // Update the import statement for ViewUser

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/discoverbooks" element={<DiscoverBooks />} />
      <Route path="/dashboard/:userId" element={<Dashboard />} />
      <Route path="/mybooklist" element={<BookList />} />
      <Route path="/tobereadlist" element={<ToBeReadList />} />
      <Route path="/groupchat" element={<GroupChat />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/book/:id" element={<DisplayBook />} />
      <Route path="/viewuser/:userId" element={<ViewUser />} /> {/* Updated route for ViewUser */}
    </Routes>
  );
}

export default App;


// import {Auth} from './components/auth'
// import './App.css'
// import {Route,Routes} from 'react-router-dom'
// import Dashboard from './components/Dashboard'
// import DiscoverBooks from './components/DiscoverBooks'
// import BookList from './components/BookList'
// import ToBeReadList from './components/ToBeReadList'
// import GroupChat from './components/GroupChat'
// import UserProfile from './components/UserProfile'
// import { ChakraProvider } from '@chakra-ui/provider'
// import DisplayBook from './components/DisplayBook'
// import ViewUser from './components/Viewuser'

// function App() {
//   return (
 
//       <Routes>
//         <Route path="/" element={<Auth/>}/>
//         <Route path="/discoverbooks" element={<DiscoverBooks/>}/>
//         <Route path="/dashboard/:userId" element={<Dashboard />}/> 
//         <Route path="/mybooklist" element={<BookList/>}/>
//         <Route path="/tobereadlist" element={<ToBeReadList/>}/>
//         <Route path="/groupchat" element={<GroupChat/>}/>         
//         <Route path="/profile" element={<UserProfile/>}/>
//         <Route path="/book/:id" element={<DisplayBook/>}/>
//         <Route path="/viewuser" element={<ViewUser/>}/>
//       </Routes>     
     
//   )
// }
// export default App;
