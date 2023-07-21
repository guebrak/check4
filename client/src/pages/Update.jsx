import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [cake, setCake] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const cakeId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setCake((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${cakeId}`, cake);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Cake</h1>
      <input
        type="text"
        placeholder="Cake title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Cake desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Cake price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cake cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all cakes</Link>
    </div>
  );
};

export default Update;