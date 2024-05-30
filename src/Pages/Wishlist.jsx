import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WishListCard from "../Component/WishListCard";
import { useContext } from "react";
import { Context } from "../Context/MyContext";
import Loading from "../Component/Loading";
import bgImage1 from   "../assets/bg2.jpg"
import bgImage2 from   "../assets/bg5.jpg"
import { toast } from "react-toastify";

const Wishlist = () => {
    const { wishlist, user, isChecked } = useContext( Context );
  const getData = async () => {
    const response = await axios.get(`https://blog-site-server-lemon.vercel.app/wishlist/${user.email}`, {
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

  const checkedBg = isChecked ? bgImage1 : bgImage2

  return (
    <>
    <div className="my-5">
        <h1   style={{backgroundImage: `url(${checkedBg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className={`text-3xl ${isChecked ? 'text-white' : 'text-black'} font-bold text-center my-5 border py-5 rounded-md`}>Wishlist</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data && data.map((item) => (
        <WishListCard key={item._id} item={item} />
      ))}
    </div>
    </div>
    </>
  );
};

export default Wishlist;
