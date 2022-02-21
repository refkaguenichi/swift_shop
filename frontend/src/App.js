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
import MapView from "./views/MapView";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import SellerRoute from "./router/SellerRoute";
import Appbar from "./components/Appbar";
import ProductEdit from "./views/ProductEdit";
import ProductList from "./views/ProductList";
import SearchView from "./views/SearchView";
import UserList from "./views/UserList";
import UserEdit from "./views/UserEdit";
import Seller from "./views/Seller";
import Dashboard from "./views/Dashboard";
import OrderList from "./views/OrderList";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <Appbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search/name" element={<SearchView />} />
        <Route path="/search/name/:name" element={<SearchView />} />
        <Route
          exact
          path="/search/category/:category"
          element={<SearchView />}
        />
        <Route
          exact
          path="/search/category/:category/name/:name"
          element={<SearchView />}
        />
        <Route
          exact
          path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
          element={<SearchView />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller/:id" element={<Seller />} />
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/products/:id" element={<ProductView />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route exact path="/products/:id/edit" element={<ProductEdit />} />
        <Route
          path="/productlist"
          element={<AdminRoute component={ProductList} />}
        />
        <Route
          path="/productlist/pageNumber/:pageNumber"
          element={<AdminRoute component={ProductList} />}
        />
        <Route path="/userlist" element={<AdminRoute component={UserList} />} />
        <Route
          path="/orderlist"
          element={<AdminRoute component={OrderList} />}
        />
        <Route
          exact
          path="/users/:id/edit"
          element={<AdminRoute component={UserEdit} />}
        />
        <Route
          path="/dashboard"
          element={<AdminRoute component={Dashboard} />}
        />
        <Route
          path="/productlist/seller"
          element={<SellerRoute component={ProductList} />}
        />
        <Route
          path="/orderlist/seller"
          element={<SellerRoute component={OrderList} />}
        />
        <Route
          path="*"
          element={
            <div id="path-error">
              <span className="fa fa-exclamation-triangle align-middle">
                Page Not Found
              </span>
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
