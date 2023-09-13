import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Films } from './components/Films';
import { About } from './components/About';

function App({ useRouter = true }: { useRouter?: boolean }) {
  const RenderedContent = () => (
    <div className='w-full min-h-screen bg-gray-900 text-white flex flex-col'>
      <Navbar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <div className='flex-1 overflow-y-auto'>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/films" element={<Films />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );

  return (
    useRouter ? (
      <Router>
        <RenderedContent />
      </Router>
    ) : <RenderedContent />
  );
}

export default App;
