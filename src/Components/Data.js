import React from "react";
import cancel from "./images/cancel.png";
import { motion } from "framer-motion/dist/framer-motion";

const Data = ({ remainder, time, id, onDelete }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="data__main"
    >
      <div>{id}</div>
      <textarea>{remainder}</textarea>
      <div>{time}</div>
      <img src={cancel} alt={cancel} onClick={() => onDelete(id)} />
    </motion.div>
  );
};

export default Data;
