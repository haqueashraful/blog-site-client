import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const RecentBlog = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/blogs?recent=true").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <motion.div
            key={item._id}
            layoutId={item._id}
            onClick={() => setSelectedId(item._id)}
          >
            <motion.img src={item.image_url} alt={item.title} />
            <motion.h5>{item.short_description}</motion.h5>
            <motion.h2>{item.title}</motion.h2>
          </motion.div>
        ))}
      <div className="w-full">
        <AnimatePresence>
          {selectedId && (
            <motion.div key={selectedId} layoutId={selectedId}>
              <motion.img
                src={data.find((item) => item.id === selectedId)?.image_url}
                alt={data.find((item) => item.id === selectedId)?.title}
              />
              <motion.h5>
                {data.find((item) => item.id === selectedId)?.short_description}
              </motion.h5>
              <motion.h2>
                {data.find((item) => item.id === selectedId)?.title}
              </motion.h2>
              <motion.button onClick={() => setSelectedId(null)}>
                Close
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </>
  );
};

export default RecentBlog;
