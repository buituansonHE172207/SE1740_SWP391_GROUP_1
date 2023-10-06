import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from './components/Header';
import Home from './components/Home/Home';
import Collection from './components/Collection/Collection';
import BooksByCollection from './components/Collection/BooksByCollection';
import ProductDetail from './components/Product/ProductDetail';
import Profile from './components/User/Profile';
import Footer from './components/Footer';
import ResetPassword from './components/User/ResetPassword';
import ForgotPassword from './components/User/ForgotPassword';
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
          <Route path='/reset-password/:token' Component={ResetPassword}></Route>
          <Route path='/forgot-password' Component={ForgotPassword}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;