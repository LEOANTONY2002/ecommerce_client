import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import axios from "axios";
import { updateCart, updateOrders } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import { SERVER_BASE_URL } from "../config";

const Cart = () => {
  const { user, cart } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();

  useEffect(() => {
    if (cart?.products?.length > 0) {
      let totalPrice = 0;
      cart?.products?.map((p) => {
        totalPrice = totalPrice + p?.quantity * p?.product?.price;
        setPrice(totalPrice);
      });
    }
  }, [cart]);

  const placeOrder = async (paymentMode, paymentId) => {
    setLoading(true);
    const { data } = await axios.post(`${SERVER_BASE_URL}/order/create`, {
      user: user?._id,
      products: cart?.products,
      totalPrice: price,
      paymentMode,
      paymentId,
      shippingAddress: user?.address,
    });
    if (data?.status === "success") {
      dispatch(updateCart(data?.cart));
      dispatch(updateOrders(data?.orders));
      navigate("/thank-you");
    }
    if (data?.status === "fail") {
      console.log(data?.msg);
    }
    setLoading(false);
  };

  const payment = async () => {
    setError(null);
    const { data } = await axios.post(`${SERVER_BASE_URL}/order/razorpay`, {
      amount: price * 100,
    });
    const options = {
      key: "rzp_test_6lF4BIPebmfLkI", // Enter the Key ID generated from the Dashboard
      amount: price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "LA",
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/73683863?v=4",
      order_id: data?.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async function (response) {
        await placeOrder("RAZORPAY", response.razorpay_payment_id);
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.address?.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      setError(response?.error?.reason);
    });

    rzp1.open();
  };

  return (
    <div className="Cart">
      <h1>Cart</h1>
      {cart?.products?.length > 0 ? (
        <main>
          <div className="c-products">
            {cart?.products?.length > 0 &&
              cart?.products?.map((p) => <CartItem p={p} />)}
          </div>
          <div className="c-content">
            <div className="c-tp">
              <span>Total Price</span>
              <h1>{price}</h1>
            </div>
            <div className="c-add">
              <span>Shipping Address</span>
              <div>
                {user?.address ? (
                  <>
                    <p>{user?.address?.addressLine1}</p>
                    <p>{user?.address?.addressLine2}</p>
                    <p>{user?.address?.city}</p>
                    <p>{user?.address?.city}</p>
                    <p>{user?.address?.state}</p>
                    <p>{user?.address?.country}</p>
                    <p>{user?.address?.pin}</p>
                    <p>{user?.address?.phone}</p>
                  </>
                ) : (
                  <h4>
                    <Link to={"/account"}>Add Address</Link>
                  </h4>
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="c-btns">
              <button onClick={() => payment()}>Pay Now</button>
              <button onClick={() => placeOrder("COD", null)}>
                Cash on Delivery
              </button>
            </div>
          )}
        </main>
      ) : (
        <div className="c-empty">
          <span>Cart is empty!</span>
        </div>
      )}
    </div>
  );
};

export default Cart;
