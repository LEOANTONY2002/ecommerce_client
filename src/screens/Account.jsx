import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../redux/userSlice";
import { SERVER_BASE_URL } from "../config";

const Account = () => {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name ?? null,
    email: user?.email ?? null,
    password: user?.password ?? null,
    photo: user?.photo ?? null,
  });
  const [address, setAddress] = useState({
    addressLine1: user?.address?.addressLine1 ?? null,
    addressLine2: user?.address?.addressLine2 ?? null,
    city: user?.address?.city ?? null,
    state: user?.address?.state ?? null,
    country: user?.address?.country ?? null,
    pin: user?.address?.pin ?? null,
    phone: user?.address?.phone ?? null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(updatedUser);

  useEffect(() => {
    if (!user) navigate("/login");
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await axios.post(`${SERVER_BASE_URL}/order`, {
      userId: user?._id,
    });
    setOrders(data?.orders);
  };

  const editUser = async () => {
    try {
      let fd = new FormData();
      fd.append("upload_preset", "bovo8606");
      fd.append("file", updatedUser?.photo);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/leoantony2002/upload",
        fd
      );

      if (res?.data) {
        console.log(res?.data);
        const { data } = await axios.post(`${SERVER_BASE_URL}/user/update`, {
          ...updatedUser,
          photo: res.data?.secure_url,
          address,
        });
        await dispatch(updateUser(data?.updatedUser));
        setOpen(false);
        setUpdatedUser({
          name: user?.name ?? null,
          email: user?.email ?? null,
          password: user?.password ?? null,
          photo: user?.photo ?? null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function onFileSelected(event) {
    await setUpdatedUser({ ...user, photo: event.target.files[0] });
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementsByClassName("myimage");
    imgtag.item(0).title = selectedFile.name;

    reader.onload = function (event) {
      imgtag.item(0).src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
  }

  return (
    <div className="Account">
      {user?.photo ? (
        <img src={user?.photo} alt="" />
      ) : (
        <img
          style={{ padding: "50px", width: "100px", height: "100px" }}
          src="https://img.icons8.com/fluency-systems-filled/80/017fed/user.png"
          alt="user"
        />
      )}
      <h1>{user?.name}</h1>
      <span>{user?.email}</span>
      <div>
        <img
          src="https://img.icons8.com/fluency-systems-filled/20/017fed/marker.png"
          alt="marker"
        />
        <span>{user?.address?.city}</span>
      </div>
      <p></p>
      <img
        onClick={() => setOpen(true)}
        src="https://img.icons8.com/material-rounded/25/ffffff/edit--v1.png"
        alt="edit--v1"
      />
      <main className="a-orders">
        <h1>Orders</h1>
        {orders?.length > 0 ? (
          orders.map((order) => (
            <Link to={`/order/${order?._id}`}>
              <main>
                <img src={order?.products[0]?.product?.photo} alt="" />
                <div>
                  <h6>{order?.deliveryStatus}</h6>
                  <span>{order?._id}</span>
                </div>
              </main>
            </Link>
          ))
        ) : (
          <div className="c-empty">
            <span>No orders have been placed!</span>
          </div>
        )}
      </main>
      {open && (
        <section className="a-edit">
          <main>
            <img
              onClick={() => setOpen(false)}
              src="https://img.icons8.com/material-rounded/25/017fed/multiply.png"
              alt="edit--v1"
            />
            <div className="ae-img">
              {updatedUser?.photo ? (
                <img className="myimage" src={updatedUser?.photo} alt="" />
              ) : (
                <img
                  className="myimage"
                  style={{ padding: "20px", width: "100px", height: "100px" }}
                  src="https://img.icons8.com/fluency-systems-filled/80/017fed/user.png"
                  alt="user"
                />
              )}
              <div>
                <img
                  src="https://img.icons8.com/fluency-systems-filled/80/ffffff/camera.png"
                  alt="user"
                />
                <input type="file" onChange={(e) => onFileSelected(e)} />
              </div>
            </div>
            <input
              type="text"
              placeholder="name"
              value={updatedUser.name}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="password"
              value={updatedUser.password}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, password: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address Line 1"
              value={address.addressLine1}
              onChange={(e) =>
                setAddress({ ...address, addressLine1: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={address.addressLine2}
              onChange={(e) =>
                setAddress({ ...address, addressLine2: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Country"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
            />
            <div>
              <input
                style={{ width: "80px" }}
                type="number"
                placeholder="Pin Code"
                value={address.pin}
                onChange={(e) =>
                  setAddress({ ...address, pin: e.target.value })
                }
              />
              <input
                style={{ width: "180px", marginLeft: "10px" }}
                type="number"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
            </div>
            <button onClick={() => editUser()}>Update</button>
          </main>
        </section>
      )}
    </div>
  );
};

export default Account;
