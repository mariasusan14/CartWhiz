import {Auth} from './components/auth'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import DiscoverBooks from './components/DiscoverBooks'
import BookList from './components/BookList'
import ToBeReadList from './components/ToBeReadList'
import GroupChat from './components/GroupChat'
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/discoverbooks" element={<DiscoverBooks/>}/>
        <Route path="/dashboard/:userId" element={<Dashboard />}/> 
        <Route path="/mybooklist" element={<BookList/>}/>
        <Route path="/tobereadlist" element={<ToBeReadList/>}/>
        <Route path="/groupchat" element={<GroupChat/>}/>        
        {/* <Route path="/profile" element={<Profile/>}/> */}
      </Routes> 
      </ChakraProvider>
   
    
  )
}

export default App
