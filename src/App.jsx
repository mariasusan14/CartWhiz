import {Auth} from './components/auth'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import DiscoverBooks from './components/DiscoverBooks'
import BookList from './components/BookList'
import ToBeReadList from './components/ToBeReadList'
import GroupChat from './components/GroupChat'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/discoverbooks" element={<DiscoverBooks/>}/>
        <Route path="/dashboard/:userId" element={<Dashboard />}/> 
        <Route path="/mybooklist" element={<BookList/>}/>
        <Route path="/tobereadlist" element={<ToBeReadList/>}/>
        <Route path="/groupchat" element={<GroupChat/>}/>         
        {/* <Route path="/profile" element={<Profile/>}/>*/}
      </Routes> 
      
    </div>
    
  )
}
export default App
