import styles from './App.scss';
import { BrowserRouter, Routes, Routeq, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Home, Contact, Login, Register, Reset, Admin} from './pages/index'
import {Header, Footer} from './components/index'
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import OrderHistory from "./pages/orderHistory/OrderHistory"
function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />

          <Route path='/admin/*' element={
            <AdminOnlyRoute>
            <Admin />
            </AdminOnlyRoute> }/>

            <Route path='/product-details/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout-details' element={<CheckoutDetails />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout-success' element={<CheckoutSuccess />} />
            <Route path='/order-history' element={<OrderHistory />} />


        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
