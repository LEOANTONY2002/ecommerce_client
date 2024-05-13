import React, { useEffect, useState } from "react";
import "./Cart.css";
import CartItem from "../components/CartItem";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SERVER_BASE_URL } from "../config";

const Order = () => {
  const [order, setOrder] = useState(0);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const { data } = await axios.get(`${SERVER_BASE_URL}/order/${id}`);
    setOrder(data?.order);
  };

  return (
    <div className="Cart">
      <h1>Order</h1>
      {order?.products?.length > 0 ? (
        <main>
          <div className="c-products">
            {order?.products?.length > 0 &&
              order?.products?.map((p) => (
                <div key={p?.product?._id} className="cp">
                  <div className="cp-prod">
                    <div>
                      <img src={p?.product?.photo} alt="" />
                      <p>{p?.product?.name}</p>
                    </div>
                    <main>
                      <div className="cp-cont">
                        <span>x{p?.quantity}</span>
                        <h5>{p?.product?.price * p?.quantity}</h5>
                      </div>
                    </main>
                  </div>
                </div>
              ))}
          </div>
          <div className="c-content">
            <div className="c-tp">
              <span>Total Price</span>
              <h1>{order?.totalPrice}</h1>
            </div>
            <div className="c-add">
              <span>Shipping Address</span>
              <div>
                <p>{order?.shippingAddress?.addressLine1}</p>
                <p>{order?.shippingAddress?.addressLine2}</p>
                <p>{order?.shippingAddress?.city}</p>
                <p>{order?.shippingAddress?.city}</p>
                <p>{order?.shippingAddress?.state}</p>
                <p>{order?.shippingAddress?.country}</p>
                <p>{order?.shippingAddress?.pin}</p>
                <p>{order?.shippingAddress?.phone}</p>
              </div>
            </div>
            <div>
              <h5>{order?.deliveryStatus}</h5>
              <h5>{order?.paymentMode}</h5>
              <h5>{order?.deliveryDate}</h5>
            </div>
          </div>
        </main>
      ) : (
        <div className="c-empty">
          <span>Order not found!</span>
        </div>
      )}
    </div>
  );
};

export default Order;
