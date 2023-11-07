import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, authorInputs, userInputs, collectionInputs, sliderInputs, publisherInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import ProductSingle from "./pages/single/ProductSingle";
import ProductNew from "./pages/new/ProductNew";
import Order from "./pages/order/Order";
import OrderDetail from "./pages/order/OrderDetail";
import Collection from "./pages/collection/Collection";
import Slider from "./pages/slider/Slider";
import Publisher from "./pages/publisher/Publisher";
import { addPublisher } from "./service/PublisherService";
import { addSlider } from "./service/SliderService";
import { addCollection } from "./service/CollectionService";
import { addAuthor } from "./service/AuthorService";
import CollectionSingle from "./pages/collection/CollectionSingle";
import SliderSingle from "./pages/slider/SliderSingle";
import PublisherSingle from "./pages/publisher/PublisherSingle";
import AuthorSingle from "./pages/single/AuthorSingle";
import Footer from "./components/footer/Footer";
import Post from "./pages/post/Post";
import PostSingle from "./pages/post/PostSingle";
import PostNew from "./pages/post/PostNew";
import Feedback from "./pages/feedback/Feedback";
import FeedbackSingle from "./pages/feedback/FeedbackSingle";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to={"/login"} />;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="authors">
              <Route index element={<RequireAuth><List type={'authors'} /></RequireAuth>} />
              <Route path=":id" element={<RequireAuth><AuthorSingle /></RequireAuth>} />
              
              <Route
                path="new"
                element={<New inputs={authorInputs} title="Add New Author" handleAdd={addAuthor } location={'/authors'}/>}
              />
            </Route>
            <Route path="products">
              <Route index element={<RequireAuth><List type={'products'} /></RequireAuth>} />
              <Route path=":productId" element={<RequireAuth><ProductSingle /></RequireAuth>} />
              <Route
                path="new"
                element={<ProductNew title="Add New Product" />}
              />
            </Route>
            <Route path="orders">
              <Route index element={<RequireAuth><Order /></RequireAuth>}></Route>
              <Route path=":id" element={<RequireAuth><OrderDetail /></RequireAuth>}></Route>
            </Route>
            <Route path="collections">
              <Route index element={<RequireAuth><Collection /></RequireAuth>}></Route>
              <Route path="new" element={<RequireAuth><New inputs={collectionInputs} title="Add New Collection" location={'/collections'} handleAdd={addCollection}/></RequireAuth>}></Route>
              <Route path=":id" element={<RequireAuth><CollectionSingle/></RequireAuth>}></Route>
            </Route>
            <Route path="sliders">
              <Route index element={<RequireAuth><Slider /></RequireAuth>}></Route>
              <Route path="new" element={<RequireAuth><New inputs={sliderInputs} title="Add New Slider" location={'/sliders'} handleAdd={addSlider} /></RequireAuth>}></Route>
              <Route path=":id" element={<RequireAuth><SliderSingle /></RequireAuth>}></Route>
            </Route>
            <Route path="publishers">
              <Route index element={<RequireAuth><Publisher></Publisher></RequireAuth> }></Route>
              <Route path="new" element={<RequireAuth><New inputs={publisherInputs} title="Add New Publisher" location={'/publishers'} handleAdd={addPublisher} /></RequireAuth>}></Route>
              <Route path=":id" element={<RequireAuth><PublisherSingle /></RequireAuth>}></Route>
            </Route>
            <Route path="posts">
              <Route index element={<RequireAuth><Post /></RequireAuth>}></Route>
              <Route path=":id" element={<RequireAuth><PostSingle /></RequireAuth>}></Route>
              <Route path="new" element={<RequireAuth><PostNew currentUser={currentUser}/></RequireAuth>}></Route>
            </Route>
            <Route path="feedbacks">
              <Route index element={<RequireAuth><Feedback /></RequireAuth>}></Route>
              <Route path=":id" element={<RequireAuth><FeedbackSingle /></RequireAuth>}></Route>
            </Route>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
