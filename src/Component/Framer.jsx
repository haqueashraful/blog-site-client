import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Framer = () => {
  const [selectedId, setSelectedId] = useState(null);

  const items = [
    {
      id: 1,
      title: "Blog Title 1",
      subtitle: "Blog Subtitle 1",
    },
    {
      id: 2,
      title: "Blog Title 2",
      subtitle: "Blog Subtitle 2",
    },
  ];

  // Function to find the selected item based on its ID
  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <div>
      {items.map((item) => (
        <motion.div
          key={item.id}
          layoutId={item.id}
          onClick={() => setSelectedId(item.id)}
        >
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedItem && (
          <motion.div layoutId={selectedId}>
            <motion.h5>{selectedItem.subtitle}</motion.h5>
            <motion.h2>{selectedItem.title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)}>
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{
          width: 200,
          height: 200,
          backgroundColor: "red",
          borderRadius: "10%",
          padding: 20,
        }}
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{
          scale: 0.8,
          rotate: -90,
          borderRadius: "100%",
         
        }}>
        <motion.h1 className="text-3xl text-white">
          Framer
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default Framer;
