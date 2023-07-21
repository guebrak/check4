import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cakes = () => {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    const fetchAllCakes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/cakes");
        setCakes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCakes();
  }, []);

  console.log(cakes);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/cakes/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>My Cakes Shop</h1>
      <div className="cakes">
        {cakes.map((cake) => (
          <div key={cake.id} className="cake">
            <img src={cake.cover} alt="" />
            <h2>{cake.title}</h2>
            <p>{cake.desc}</p>
            <span>${cake.price}</span>
            <button className="delete" onClick={() => handleDelete(cake.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${cake.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new cake
        </Link>
      </button>
    </div>
  );
};

export default Cakes;