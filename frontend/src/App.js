import logo from './logo.svg';
import './App.css';

import Home from './Home/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
