import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as CarouselRC } from "react-responsive-carousel";
import Product from "./../components/Product";
import MessageBox from "./../components/MessageBox";
import LoadingBox from "./../components/LoadingBox";
import {
  listProductCategories,
  listProducts,
  listTopProducts,
} from "./../JS/actions/productActions";
import { Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listTopSellers } from "../JS/actions/userActions";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const topProductList = useSelector((state) => state.topProductList);
  const {
    loading: loadingTop,
    error: errorTop,
    products: topProducts,
  } = topProductList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopProducts());
    dispatch(listProductCategories());
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <>
      {/* <>
        {" "}
        {loadingTop ? (
          <LoadingBox />
        ) : errorTop ? (
          <MessageBox variant="danger" errorTop={errorTop} />
        ) : (
          <>
            {topProducts && topProducts.length === 0 && (
              <MessageBox variant="info" sl={topProducts.length} />
            )}
            <Carousel>
              {topProducts &&
                topProducts.map((tp) => (
                  <Carousel.Item interval={1000} key={tp._id}>
                    <Link to={`/products/${tp._id}`}>
                      <img
                        className="d-block w-100 carousel"
                        src={tp.image && `/uploads/${tp.image}`}
                        alt={tp.name}
                      />
                      <Carousel.Caption>
                        <span>{tp.name}</span>
                      </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                ))}
            </Carousel>
          </>
        )}
      </> */}
      <>
        {" "}
        {loadingTop ? (
          <LoadingBox />
        ) : errorTop ? (
          <MessageBox variant="danger" errorTop={errorTop} />
        ) : (
          <>
            {topProducts && topProducts.length === 0 && (
              <MessageBox variant="info" tp={topProducts.length} />
            )}
            <CarouselRC showArrows autoPlay showThumbs={false}>
              {topProducts &&
                topProducts.map((tp) => (
                  <div key={tp._id}>
                    <Link to={`/products/${tp._id}`}>
                      <img
                        className="logo"
                        src={tp.image && `/uploads/${tp.image}`}
                        alt={tp.name}
                      />
                      <p className="legend">{tp.name}</p>
                    </Link>
                  </div>
                ))}
            </CarouselRC>
          </>
        )}
      </>
      <div>
        <h2>Top Categories</h2>
        {loadingCategories ? (
          <LoadingBox />
        ) : errorCategories ? (
          <MessageBox variant="danger" errorCategories={errorCategories} />
        ) : (
          <div className="category">
            {categories &&
              categories.map((category, idx) => (
                <>
                  <Card style={{ width: "20rem", margin: "1rem auto" }}>
                    <Link to={`/search/category/${category}`}>
                      <Card.Img
                        variant="top"
                        src={
                          category.toLowerCase() ===
                          ("laptop" || "pc" || "computer")
                            ? "https://images.frandroid.com/wp-content/uploads/2021/04/microsoft-surface-laptop-4-frandroid-2021.png"
                            : category.toLowerCase() === ("watches" || "watch")
                            ? "https://img.bfmtv.com/images/be06a4/32fd0aec5a7fce6ab49b4b592a.jpg"
                            : category.toLowerCase() === ("pants" || "pantalon")
                            ? "https://cdn.aarp.net/content/dam/aarp/entertainment/beauty-and-style/2022/01/1140-utility-pants.jpg"
                            : category.toLowerCase() ===
                              ("shoes" || "shoe" || "snickers" || "snicker")
                            ? "https://www.runningshoesguru.com/wp-content/uploads/2020/02/running-shoes-reviews.jpg"
                            : category.toLowerCase() === ("bike" || "bikes")
                            ? "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                            : category.toLowerCase() ===
                              ("clothes" || "clothe" || "clothing" || "cloth")
                            ? "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                            : category.toLowerCase() === ("glasses" || "glass")
                            ? "https://images.prismic.io/bn-ca/a39e7042-ef48-4f4e-83a3-72a0dedf25f8_ProductFlatlay_LowRes.jpg?auto=compress%2Cformat&rect=68%2C0%2C1465%2C1067&w=2033&h=1481"
                            : "https://i.ytimg.com/vi/_kqVe4c3T00/maxresdefault.jpg"
                        }
                        alt={idx}
                      />

                      <Card.Body>
                        <Card.Title>{category}</Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </>
              ))}
          </div>
        )}
      </div>
      <div>
        <h2>Top Sellers</h2>
        {loadingSellers ? (
          <LoadingBox />
        ) : errorSellers ? (
          <MessageBox variant="danger" errorSellers={errorSellers} />
        ) : (
          <>
            {sellers.length === 0 && (
              <MessageBox variant="info" sl={sellers.length} />
            )}
            <CarouselRC showArrows autoPlay showThumbs={false}>
              {sellers.map((seller) => (
                <div key={seller._id}>
                  <Link to={`/seller/${seller._id}`}>
                    <img
                      className="logo"
                      src={
                        seller.seller.logo
                          ? seller.seller.logo
                          : "https://as2.ftcdn.net/v2/jpg/02/83/64/63/500_F_283646367_OqoeMFGI3CBh5O2hEU7CYOzHz3ZYtCE7.jpg"
                      }
                      alt={seller.seller.name || seller._id}
                    />
                    <p className="legend">
                      {seller.seller.name ? seller.seller.name : "Seller"}
                    </p>
                  </Link>
                </div>
              ))}
            </CarouselRC>
          </>
        )}
        <h2>Featured Products</h2>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger" error={error} />
        ) : (
          <div className="products g-4 row row-cols-md-2 row-cols-1">
            {products.length !== 0 &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
