import React, { useState, useEffect } from "react";
import "./Style.css";
import Data from "./Data";
import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";

const Remainder = () => {
  const [remainder, setRemainder] = useState([]);
  const [formData, setFormData] = useState([]);

  const noRemainder = !remainder || (remainder && remainder.length === 0);

  //------------------------ Axios Get method --- use baseURL

  const getRemainder = async () => {
    const res = await axios
      .get("http://localhost:3001/remainder")
      .catch((err) => console.log("get:---->", err));

    if (res && res.data) setRemainder(res.data);
  };

  //------------------------ Getting data from input field to useState---Event handler

  const handlChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // -------------------Adding new remainder to the db.json using POST method

  const addRemainder = async (event) => {
    event.preventDefault();

    const res = await axios
      .post("http://localhost:3001/remainder", formData)
      .catch((err) => console.log("post:---->", err));
    if (res) getRemainder();
  };

  //---------------------Deleting existing remainder by passing id as argument

  const deleteRemainder = async (id) => {
    const res = await axios
      .delete(`http://localhost:3001/remainder/${id}`)
      .catch((err) => console.log("delete:--->", err));

    if (res) getRemainder();
  };

  //--------------------Component Did Mount
  useEffect(() => {
    getRemainder();
  }, []);

  return (
    <div className="form__main">
      <div className="form__input">
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={addRemainder}
        >
          <label htmlFor="id">ID</label>
          <input
            placeholder="Example : 1"
            name="id"
            type="number"
            required
            onChange={handlChange}
          />
          <label htmlFor="remainder">Remainder</label>
          <input
            placeholder="Enter remainder"
            name="remainder"
            required
            onChange={handlChange}
          />
          <label htmlFor="time">Time</label>
          <input
            placeholder="Enter Time"
            name="time"
            type="time"
            required
            onChange={handlChange}
          />
          <motion.button onClick="submit" whileTap={{ scale: 0.7 }}>
            Add
          </motion.button>
        </motion.form>
      </div>
      <div className="form__output">
        {!noRemainder &&
          remainder.map((rem, ind) => (
            <Data key={ind} {...rem} onDelete={deleteRemainder} />
          ))}
      </div>
      {noRemainder && (
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4 }}
          id="alert"
        >
          <span> No Remainder</span>
        </motion.div>
      )}
    </div>
  );
};

export default Remainder;
