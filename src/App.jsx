import {Auth} from './components/auth'
import './App.css'
import Dashboard from './components/Dashboard'
import DiscoverBooks from './components/DiscoverBooks'
import BookList from './components/BookList'
import ToBeReadList from './components/ToBeReadList'
import GroupChat from './components/GroupChat'



function App() {
  return (
    <div>
      <h1>hello</h1>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/discoverbooks" element={<DiscoverBooks/>}/>
        <Route path="/dashboard/:userId" element={<Dashboard />}/> 
        <Route path="/mybooklist" element={<BookList/>}/>
        <Route path="/tobereadlist" element={<ToBeReadList/>}/>
        <Route path="/groupchat" element={<GroupChat/>}/>        
        {/* <Route path="/profile" element={<Profile/>}/> */}
      </Routes> 
      
    </div>
    
  )
}

export default App
