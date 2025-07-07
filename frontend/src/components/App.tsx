import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from 'pages/Home';
import About from 'pages/About';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login';
import Register from 'pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
