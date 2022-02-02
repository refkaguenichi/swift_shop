import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import ProductView from "./views/ProductView";
import Cart from "./views/Cart";
import Navbar from "./components/Navbar";
import Login from "./views/Login";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<ProductView />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
