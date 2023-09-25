import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from './components/Header';
import Home from './components/Home/Home';
import Collection from './components/Collection/Collection';
function App() {
  return (
    <div>
        <Header/>

        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/collections' Component={Collection} element={<Collection/>}></Route>
        </Routes>

      
    </div>
  );
}

export default App;