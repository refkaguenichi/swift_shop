import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./../components/Product";
import MessageBox from "./../components/MessageBox";
import LoadingBox from "./../components/LoadingBox";
import { listProducts } from "./../JS/actions/productActions";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger" error={error} />
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
