import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './component/Login';
import Home from './component/Home';
import Signup from './component/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
