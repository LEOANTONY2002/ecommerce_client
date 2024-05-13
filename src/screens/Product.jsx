import React, { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/userSlice";
import { SERVER_BASE_URL } from "../config";

const Product = () => {
  const id = window.location.pathname.split("/")[2];
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(product);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data } = await axios.get(`${SERVER_BASE_URL}/product/${id}`);
    setProduct(data?.product);
  };

  const addToCart = async () => {
    const { data } = await axios.post(`${SERVER_BASE_URL}/cart/add`, {
      userId: user?._id,
      productData: {
        product,
        quantity,
      },
    });
    if (data?.status === "success") {
      dispatch(updateCart(data?.cart));
    }
  };

  return (
    <div className="Product">
      <img src={product?.photo} alt="" />
      <h1>{product?.name}</h1>
      <span>{product?.description}</span>
      <h4>{product?.price}</h4>
      <section>
        {quantity > 1 && (
          <span onClick={() => setQuantity(quantity - 1)}>-</span>
        )}
        {quantity}
        {product?.stock > quantity && (
          <span onClick={() => setQuantity(quantity + 1)}>+</span>
        )}
      </section>
      <p></p>
      <div onClick={() => addToCart()}>
        <img
          src="https://img.icons8.com/material-rounded/30/ffffff/add-shopping-cart.png"
          alt="add-shopping-cart"
        />
      </div>
    </div>
  );
};

export default Product;
