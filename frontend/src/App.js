import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ProductView from "./views/ProductView";
import Cart from "./views/Cart";
import Login from "./views/Login";
import Register from "./views/Register";
import ShippingAddress from "./views/ShippingAddress";
import PaymentMethod from "./views/PaymentMethod";
import PlaceOrder from "./views/PlaceOrder";
import Order from "./views/Order";
import OrderHistory from "./views/OrderHistory";
import Profile from "./views/Profile";
import PrivateRoute from "./router/PrivateRoute";
import Appbar from "./components/Appbar";
const App = () => {
  return (
    <>
      <Appbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/products/:id" element={<ProductView />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="/cart/:id" element={<Cart />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </>
  );
};

export default App;
