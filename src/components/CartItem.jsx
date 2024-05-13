import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/userSlice";
import { SERVER_BASE_URL } from "../config";

const CartItem = ({ p }) => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateQuantity = async (isIncrement) => {
    setLoading(true);
    const { data } = await axios.post(`${SERVER_BASE_URL}/cart/quantity`, {
      userId: user?._id,
      productData: p,
      isIncrement,
    });
    if (data?.status === "success") {
      dispatch(updateCart(data?.cart));
    }
    if (data?.status === "fail") {
      console.log(data?.msg);
    }
    setLoading(false);
  };

  const removeFromCart = async (productId) => {
    const { data } = await axios.post(`${SERVER_BASE_URL}/cart/remove`, {
      userId: user?._id,
      productId,
    });
    if (data?.status === "success") {
      dispatch(updateCart(data?.cart));
    }
  };

  return (
    <div key={p?.product?._id} className="cp">
      <div className="cp-prod">
        <div>
          <img src={p?.product?.photo} alt="" />
          <p>{p?.product?.name}</p>
        </div>
        <main>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <section>
              {p?.quantity > 1 && (
                <span
                  onClick={() => {
                    updateQuantity(false);
                  }}
                >
                  -
                </span>
              )}
              {p?.quantity}
              {p?.product?.stock > p?.quantity && (
                <span
                  onClick={() => {
                    updateQuantity(true);
                  }}
                >
                  +
                </span>
              )}
            </section>
          )}
          <div className="cp-cont">
            <span>x{p?.quantity}</span>
            <h5>{p?.product?.price * p?.quantity}</h5>
          </div>
        </main>
      </div>
      <img
        onClick={() => removeFromCart(p?.product?._id)}
        width="30"
        height="30"
        src="https://img.icons8.com/ios-glyphs/30/19abff/multiply.png"
        alt="multiply"
      />
    </div>
  );
};

export default CartItem;
