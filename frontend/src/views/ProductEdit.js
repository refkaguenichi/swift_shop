import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../JS/constants/productConstants";
import {
  createProduct,
  detailsProduct,
  updateProduct,
} from "../JS/actions/productActions";

const ProductEdit = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      navigate("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (productId) {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
        })
      );
    } else {
      dispatch(
        createProduct({
          _id: productId,
          name,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
        })
      );
    }
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>{productId ? "Edit Product " : "Add new Product "}</h1>
        </div>
        {loadingUpdate && <LoadingBox />}
        {errorUpdate && (
          <MessageBox variant="danger" errorUpdate={errorUpdate} />
        )}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger" otherErrorUpdate={error} />
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter an image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingBox />}
              {errorUpload && (
                <MessageBox variant="danger" errorUpload={errorUpload} />
              )}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" style={{ color: "#ccc" }}>
                  Select category...
                </option>
                <option value="Any">Any</option>
                <option value="Books&movies&music">
                  Books, Movies & Music
                </option>
                <option value="Furniture">Furniture</option>
                <option value="Tools&HomeImprovement">
                  Tools & Home Improvement
                </option>
                <option value="HousingForSale">Housing for Sale</option>
                <option value="PropertyRentals">Property Rentals</option>
                <option value="Health&Beauty">Health & Beauty</option>
                <option value="Electronics">Electronics</option>
                <option value="Phones&Accessories">Phones & Accessories</option>
                <option value="Vehicles">Vehicles</option>
                <option value="SportingGoods">Sporting Goods</option>
                <option value="Jewelry&Watches">Jewelry & Watches</option>
                <option value="Clothing&Shoes">Clothing & Shoes</option>
                <option value="Accessories">Accessories</option>
                <option value="Pets/Animals">Pets/Animals</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};
export default ProductEdit;
