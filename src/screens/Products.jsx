import React, { useState } from "react";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [product, setProduct] = useState({
    id: null,
    name: null,
    description: null,
    price: null,
    photo: null,
  });

  console.log(products);
  console.log(product);

  const add = async () => {
    setProducts([...products, { ...product, id: products?.length + 1 }]);
  };

  const deleteProduct = async (id) => {
    const updatedProducts = products.filter((p) => p?.id !== id);
    setProducts(updatedProducts);
  };

  const editProduct = async () => {
    const updatedProducts = products.filter((p) => p?.id !== product?.id);
    setProducts([...updatedProducts, product]);
  };

  return (
    <div className="Products">
      <div className="h-products">
        {products.length > 0 &&
          products?.map((product) => (
            <div className="hp-prod">
              <img src={product?.photo} alt="" />
              <div className="hp-cont">
                <div>
                  <p>{product?.name}</p>
                  <span>{product?.description}</span>
                </div>
                <h5>{product?.price}</h5>
              </div>
              <button
                onClick={() => {
                  setEdit(true);
                  setProduct(product);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteProduct(product?.id)}>Del</button>
            </div>
          ))}
      </div>
      <div>
        <h1>{edit ? "Edit" : "Add"}</h1>
        <input
          type="text"
          placeholder="Photo"
          onChange={(e) => setProduct({ ...product, photo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <button onClick={edit ? () => editProduct() : () => add()}>
          {edit ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default Products;
