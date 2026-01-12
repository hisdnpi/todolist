// import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ToDoList from './Todolist';
// import Home from './pages/Home';
import Karyawan from './Karyawan';
import Notes from './Notes';
import NewNotes from './Notes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cyan-900">
        <nav className="bg-cyan-950 p-4 w-full">
          <div className="text-cyan-100 flex justify-between items-center">
            <Link to="/" className="text-cyan-100 text-xl font-semibold">
              My Website
            </Link>

            <div className="space-x-6 hidden md:flex">
              {/* <Link to="/" className="hover:text-gray-300">Home</Link> */}
              <Link to="/notes" className="hover:text-gray-300">Activity Notes</Link>
              <Link to="/newNotes" className="hover:text-gray-300">NEW! Activity Notes</Link>
              <Link to="/todolist" className="hover:text-gray-300">To Do List</Link>
              <Link to="/karyawan" className="hover:text-gray-300">Karyawan</Link>
            </div>
          </div>
        </nav>

        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/todolist' element={<ToDoList />} />
          <Route path='/karyawan' element={<Karyawan />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/newNotes' element={<NewNotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

