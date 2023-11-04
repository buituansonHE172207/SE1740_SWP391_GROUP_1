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
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { getUserInfoByEmail } from './services/UserService';
import { getAllCartByUserId } from './services/CartService';
import Cart from './components/Cart/Cart';
import Search from './components/Home/Search';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Checkout/Payment';
import Login from './components/Login/Login';
import Activate from './components/User/Activate';
import CheckMail from './components/User/CheckMail';
import Paypal from './components/Checkout/Paypal';
import Wishlist from './components/Wishlist/Wishlist';
import ProfileDetail from "./components/User/ProfileDetail";
import Post from "./components/Post/Post";
import PostDetail from "./components/Post/PostDetail";
import OrderDetail from "./components/User/OrderDetail";
import ChangePassword from "./components/User/ChangePassword";
function App() {
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const [profileData, setProfileData] = useState()
  const [cart, setCart] = useState([])
  const [cartChange, setCartChange] = useState(false)

  const handleCart = async () => {
    try {
      const user_email = cookies.authToken && jwt_decode(cookies.authToken).sub;
      if (!user_email) return;
      const userInfo = await getUserInfoByEmail(user_email);
      const cartData = await getAllCartByUserId(userInfo?.data.id);

      setProfileData(userInfo?.data);
      setCart(cartData?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleCart();
  }, [cookies, cartChange]);

  return (
    <div>
      <Router>
        <Header cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} cart={cart} setCartChange={setCartChange} cartChange={cartChange} />
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/collections' Component={Collection}></Route>
          <Route path='/collections/:id' Component={BooksByCollection}></Route>
          <Route path='/products/:id' element={<ProductDetail cookies={cookies} setCart={setCart} cart={cart} cartChange={cartChange} setCartChange={setCartChange} setCookie={setCookies} removeCookie={removeCookies} />}></Route>
          <Route path='/account' element={<Profile cart={cart} cookies={cookies} />}></Route>
          <Route path="/account-detail" element={<ProfileDetail cookies={cookies} />}></Route>
          <Route path='/reset-password/:token' Component={ResetPassword}></Route>
          <Route path='/forgot-password' Component={ForgotPassword}></Route>
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart} setCartChange={setCartChange} cartChange={cartChange} />}></Route>
          <Route path='/search/:name' Component={Search}></Route>
          <Route path='/checkout' element={<Checkout cart={cart} setCart={setCart} cookies={cookies} setCartChange={setCartChange} cartChange={cartChange} />}></Route>
          <Route path='/checkout/payment' element={<Payment cart={cart} setCart={setCart} setCartChange={setCartChange} cookies={cookies} cartChange={cartChange} />}></Route>
          <Route path='/checkout/payment/paypal' element={<Paypal value={((cart?.orderDetails?.reduce((acc, item) => acc + item.salePrice * item.amount, 0) + 30000) / 24500).toFixed(2)} cart={cart} setCart={setCart} />}></Route>
          <Route path='/login' element={<Login cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} cart={cart} setCartChange={setCartChange} cartChange={cartChange} />}></Route>
          <Route path='/activation/:token' Component={Activate}></Route>
          <Route path='/check-email' Component={CheckMail}></Route>
          <Route path='/wishlist' element={<Wishlist setCart={setCart} cart={cart} />}></Route>
          <Route path='/blogs/:id' element={<Post />}></Route>
          <Route path='/blog-detail/:id' element={<PostDetail />}></Route>
          <Route path="/order-detail/:id" element={<OrderDetail />}></Route>
          <Route path="/change-password" element={<ChangePassword cookies={cookies}/>}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;