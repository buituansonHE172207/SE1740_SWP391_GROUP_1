import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/Header';
import Home from './components/Home/Home';
function App() {
  return (
    <div>
      {/* <Router>
          <Routes>
            <Route path='/' Component={Slider}></Route>
            
          </Routes>
        </Router> */}
        <Header/>
        <Home/>
    </div>
  );
}

export default App;
