import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SliderCard from "./SliderCard";
import Loading from "./Loading";

const Slider = () => {
  const splideRef = useRef(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["featured"],
    queryFn: () =>
      axios
        .get("https://blog-site-server-lemon.vercel.app/blogs", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });


 

  useEffect(() => {
    if (splideRef.current && data) {
      const splide = new Splide(splideRef.current, {
        type: "loop",
        drag: "free",
        focus: "center",
        perPage: 2,
        autoScroll: {
          speed: 0.5,
        },
        extensions: { AutoScroll },
      });

      splide.mount({ AutoScroll });

      return () => {
        splide.destroy();
      };
    }
  }, [data]);

  if (isLoading) return <div><Loading /></div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="splide my-10 rounded-md" ref={splideRef}>
      <div className="splide__track">
        <ul className="splide__list gap-2 lg:gap-8">
          {data &&
            data.map((item) => (
              <li className="splide__slide" key={item._id}>
                <SliderCard data={item} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Slider;
