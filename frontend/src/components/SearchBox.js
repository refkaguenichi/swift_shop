import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ show, setShow }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
    setName("");
    setShow(!show);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="search">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
