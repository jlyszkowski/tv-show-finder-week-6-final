import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Details from './pages/Details'
import Results from './pages/Results'

const App = () => {
  return (
    <Router basename="/tv-show-finder-week-6-final">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/show/:id" element={<Details />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;