import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/Header';
import Slider from './components/Slider';
import ListProduct from './components/ListProduct';
import ViewProduct from './components/ViewProduct';
function App() {
  return (
    <div>
      {/* <Router>
          <Routes>
            <Route path='/' Component={Slider}></Route>
            
          </Routes>
        </Router> */}
      {/* <Header/> */}
        {/* <Slider/> */}
      {/* <ListProduct title="SÁCH MỚI" query="sorted-and-paged?sortBy=sold&page=1&size=5" /> */}
      <ViewProduct/>
    </div>
  );
}

export default App;
