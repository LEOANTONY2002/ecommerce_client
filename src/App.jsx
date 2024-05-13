import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import { useSelector } from "react-redux";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Product from "./screens/Product";
import Products from "./screens/Products";
import Cart from "./screens/Cart";
import Nav from "./components/Nav";
import Account from "./screens/Account";
import Order from "./screens/Order";

function App() {
  const { cart } = useSelector((state) => state.user);
  const location = useLocation();

  console.log("cart", cart);

  return (
    <div className="App">
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Nav />
      )}
      <Routes>
        <Route path="/order/:id" element={<Order />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;

// {path === "/" ? <Home /> : path === "/about" ? <About /> : <div>Not Found</div> }
