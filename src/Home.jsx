import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { SERVER_BASE_URL } from "./config";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    if (!user) navigate("/login");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get(`${SERVER_BASE_URL}/product/all`);
    setProducts(data?.products);
  };

  return (
    <div className="Home">
      <div className="h-products">
        {products.length > 0 &&
          products?.map((product) => (
            <Link key={product?._id} to={`/product/${product?._id}`}>
              <div className="hp-prod">
                <img src={product?.photo} alt="" />
                <div className="hp-cont">
                  <div>
                    <p>{product?.name}</p>
                    <span>{product?.description}</span>
                  </div>
                  <h5>{product?.price}</h5>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
