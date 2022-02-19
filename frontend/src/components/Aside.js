import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listProductCategories } from "./../JS/actions/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const Aside = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const dispatch = useDispatch();
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <div className={sidebarIsOpen ? "open" : ""}>
      <ul className="categories d-flex">
        <li>
          <strong>Categories</strong>
          <button
            onClick={() => setSidebarIsOpen(false)}
            className="close-sidebar"
            type="button"
          >
            <i className="fa fa-close"></i>
          </button>
        </li>
        {loadingCategories ? (
          <LoadingBox />
        ) : errorCategories ? (
          <MessageBox variant="danger" errorCategories={errorCategories} />
        ) : (
          categories.map((c) => (
            <li key={c}>
              <Link
                to={`/search/category/${c}`}
                onClick={() => setSidebarIsOpen(false)}
              >
                {c}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Aside;
