import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Timeline from './components/TimeLine';
import Books from './components/Books'
import Departments from './components/Departments';
import BookDetailedView from './components/BookDetailedView';
import InsertBookForm from './components/InsertBook';
import ProtectedRoute from './components/ProtectedRoute';
import SemBooks from './components/SemBooks';

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/timeline" element={<ProtectedRoute><Timeline/></ProtectedRoute>}/>
        <Route path="/books" element={<ProtectedRoute><Books/></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
        <Route path="/book/:bookId" element={<ProtectedRoute><BookDetailedView /></ProtectedRoute>} />
        <Route path="/insert-book" element={<ProtectedRoute><InsertBookForm/></ProtectedRoute>} />
        <Route path="/sem-books" element={<ProtectedRoute><SemBooks /></ProtectedRoute>} />
        <Route path="/not-found" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
