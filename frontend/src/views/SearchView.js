import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { listProducts } from "../JS/actions/productActions";
import { prices, ratings } from "../utils/utils";
import { listProductCategories } from "./../JS/actions/productActions";
import { Dropdown } from "react-bootstrap";

const SearchView = () => {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
    dispatch(listProductCategories());
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div>
      <style type="text/css">
        {`
    .btn-filter {
      margin-top: 0.5rem;
      color: #111;
      font-size: 1.4rem;
      background-color: #f0c040;
      border-color: #f0c040;
      text-align: start;
    }
    `}
      </style>
      <div className="rows">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger" serachError={error} />
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
      <div className="rows top filter">
        <div className="col-1 list">
          <h3>Departments</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorCategories ? (
              <MessageBox variant="danger" errorCategories={errorCategories} />
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  variant="filter"
                  id="dropdown-basic"
                  className="w-100"
                >
                  Categories
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Dropdown.Item
                    className={"all" === category ? "active" : ""}
                    href={getFilterUrl({ category: "all" })}
                  >
                    Any
                  </Dropdown.Item>
                  {categories.map((c) => (
                    <Dropdown.Item
                      className={c === category ? "active" : ""}
                      href={getFilterUrl({ category: c })}
                      key={c}
                    >
                      {c}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          <Dropdown>
            <Dropdown.Toggle
              variant="filter"
              id="dropdown-basic"
              className="w-100"
            >
              Price
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {prices.map((p) => (
                <Dropdown.Item
                  href={getFilterUrl({ min: p.min, max: p.max })}
                  className={
                    `${p.max}-${p.min}` === `${max}-${min}` ? "active" : ""
                  }
                  key={p.name}
                >
                  {p.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              variant="filter"
              id="dropdown-basic"
              className="w-100"
            >
              Avg. Customer Review
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {ratings.map((r) => (
                <Dropdown.Item
                  href={getFilterUrl({ rating: r.rating })}
                  className={`${r.rating}` === `${rating}` ? "active" : ""}
                  key={r.name}
                >
                  <Rating caption={" & up"} rating={r.rating} />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              variant="filter"
              id="dropdown-basic"
              className="w-100"
            >
              {"newest" === order
                ? "Newest Arrivals"
                : "lowest" === order
                ? " Price: Low to High"
                : "highest" === order
                ? " Price: High to Low"
                : "toprated" === order && " Avg. Customer Reviews"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item
                href={getFilterUrl({ order: "newest" })}
                className={"newest" === order ? "active" : ""}
              >
                Newest Arrivals
              </Dropdown.Item>
              <Dropdown.Item
                href={getFilterUrl({ order: "lowest" })}
                className={"lowest" === order ? "active" : ""}
              >
                Price: Low to High
              </Dropdown.Item>
              <Dropdown.Item
                href={getFilterUrl({ order: "highest" })}
                className={"highest" === order ? "active" : ""}
              >
                Price: High to Low
              </Dropdown.Item>
              <Dropdown.Item
                href={getFilterUrl({ order: "toprated" })}
                className={"toprated" === order ? "active" : ""}
              >
                Avg. Customer Reviews
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger" productError={error} />
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox variant="info" pLength={products.length} />
              )}
              <div className="rows center">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <div className="rows center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? "active" : ""}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchView;
