import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WishListCard from "../Component/WishListCard";
import { useContext } from "react";
import { Context } from "../Context/MyContext";
import Loading from "../Component/Loading";

const Wishlist = () => {
    const { wishlist } = useContext( Context );
  const getData = async () => {
    const response = await axios.get("https://blog-site-server-lemon.vercel.app/wishlist", {
      withCredentials: true,
    });
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["wishlist", wishlist],
    queryFn: getData,
  });

  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data && data.map((item) => (
        <WishListCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Wishlist;
