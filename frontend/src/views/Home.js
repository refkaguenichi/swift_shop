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
import { Card } from "react-bootstrap";
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
            {categories.length === 0 && (
              <MessageBox variant="info" tpcat={categories.length} />
            )}
            {categories &&
              categories.map((category, idx) => (
                <>
                  <Card style={{ width: "20rem", margin: "1rem auto" }}>
                    <Link to={`/search/category/${category}`}>
                      <Card.Img
                        variant="top"
                        src={
                          category.toLowerCase() === "vehicles"
                            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Tdr4J98z7vNsi4hBqVwlfrCRjO4iXVT5Og&usqp=CAU"
                            : category.toLowerCase() === "jewelry&watches"
                            ? "https://finchannel.com/wp-content/uploads/2017/12/gurgenidze_00001jewelrywatches.jpg"
                            : category.toLowerCase() === "phones&accessories"
                            ? "https://cdn.moneymint.com/wp-content/uploads/2021/02/Cell-Phone-Accessories-Business-Plan-%E2%80%93-How-To-Start-1.jpg"
                            : category.toLowerCase() === "accessories"
                            ? "https://e-deals.com.tn/ecdata/stores/QXVAZW3888/image/data/www.madebyvadim.com.jpg"
                            : category.toLowerCase() === "electronics"
                            ? "https://ecommerce.ccc2020.fr/wp-content/uploads/2020/10/electronic-gadgets.jpeg"
                            : category.toLowerCase() === "clothing&shoes"
                            ? "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                            : category.toLowerCase() === "sportinggoods"
                            ? "https://unitedfsi.com/wp-content/uploads/2018/10/Sporting-Goods-800x744.jpg"
                            : category.toLowerCase() === "pets/animals"
                            ? "https://petsrus.com.au/uploads/images/_1500x1120_fit_center-center_70_none/pets-in-park-2.jpg"
                            : category.toLowerCase() === "health&beauty"
                            ? "https://livingchapterthree.com/wp-content/uploads/2020/02/header_image_Article_Main-The_Many_Health_and_Beauty_Benefits_of_Castor_Oil.png"
                            : category.toLowerCase() === "propertyrentals"
                            ? "https://www.tokeet.com/wp-content/uploads/2018/10/rental-property-management-img2.jpg"
                            : category.toLowerCase() === "housingforsale"
                            ? "https://www.tokeet.com/wp-content/uploads/2018/10/rental-property-management-img2.jpg"
                            : category.toLowerCase() === "tools&homeimprovement"
                            ? "https://www.pngkit.com/png/detail/105-1053299_top-3-home-improvement-trends-ideas-home-repair.png"
                            : category.toLowerCase() === "furniture"
                            ? "https://images.ctfassets.net/5de70he6op10/7KotRtmFAvP7OWLTE7PHjH/e31963346fdc1532c2ab8aab3ac3360c/Furniture__Gateway_LP_LS_03.jpg?w=934&q=80&fm=jpg&fl=progressive"
                            : category.toLowerCase() === " books&movies&music"
                            ? "https://fortheloveofharry.com/wp-content/uploads/2014/12/Books-Movies-and-Music-Index.jpg"
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
                        seller.seller.image
                          ? `/uploads/${seller.seller.image}`
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
          <div className="products row row-cols-md-2 row-cols-1">
            {products.length === 0 && (
              <MessageBox variant="info" tps={products.length} />
            )}
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
