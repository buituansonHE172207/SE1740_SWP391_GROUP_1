import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from './components/Header';
import Home from './components/Home/Home';
import Collection from './components/Collection/Collection';
import BooksByCollection from './components/Collection/BooksByCollection';
import ProductDetail from './components/Product/ProductDetail';
function App() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/collections' Component={Collection}></Route>
          <Route path='/collections/:id' Component={BooksByCollection}></Route>
          <Route path='/products/:id' Component={ProductDetail}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;