import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from './components/Header';
import Home from './components/Home/Home';
import Collection from './components/Collection/Collection';
import BooksByCollection from './components/Collection/BooksByCollection';
import ProductDetail from './components/Product/ProductDetail';
import Profile from './components/User/Profile';
function App() {
  return (
    <div>
      <Router>
      <Header />
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/collections' Component={Collection}></Route>
          <Route path='/collections/:id' Component={BooksByCollection}></Route>
          <Route path='/products/:id' Component={ProductDetail}></Route>
          <Route path='/account' Component={Profile}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;