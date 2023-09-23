import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './components/Header';
import Slider from './components/Slider';
function App() {
  return (
    <div>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' Component={Slider}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
