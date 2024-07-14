import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

function App() {
  return (
   <>
    <NoteState>
     <BrowserRouter>
     <Navbar></Navbar>
     <Routes>
       <Route path='/home' element={<Home></Home>}></Route>
       <Route path='/about' element={<About></About>}></Route>
     </Routes>
     </BrowserRouter>
    </NoteState>
   </>
  );
}

export default App;
