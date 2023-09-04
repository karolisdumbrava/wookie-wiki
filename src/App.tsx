import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import { About } from './components/About';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Films } from './components/Films';


function App() {
  return (
    <Router>
      <div className='w-full min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row'>
        <Navbar />
        <div className='flex-1 flex flex-col overflow-hidden lg:ml-64'>
          <div className='flex-1 overflow-y-auto'>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/films" element={<Films />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
