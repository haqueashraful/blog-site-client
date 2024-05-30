import {
    Button,
    Heading,
    Image,
    Text,
  } from "@chakra-ui/react";
  import food from "../assets/food.jpg";
  import techno from "../assets/technology.jpg";
  import travel from "../assets/travel.jpg";
  import { useNavigate } from "react-router-dom";
  import { motion } from "framer-motion";
  
  const Banner = () => {
    const navigate = useNavigate();
    return (
      <motion.div
        // initial={{ scale: 0 }}
        // animate={{ rotate: 360, scale: 1 }}
        // transition={{
        //   type: "spring",
        //   stiffness: 260,
        //   damping: 20,
        //   duration: 1,
        // }}
        className="my-10 px-2 lg:px-0 bg-white/40 rounded-md"
      >
        <div className="flex flex-col lg:flex-row gap-3 justify-center rounded-md items-center overflow-hidden">
          <div className="flex w-full">
            <div className="h-[300px] w-1/2 relative">
              <Image
                objectFit="cover"
                height={"100%"}
                src={techno}
                className="w-full"
              />
              <h1 className="flex flex-col justify-center items-center text-xl font-bold text-white absolute inset-0 z-10">
                Technology
              </h1>
            </div>
            <div className="h-[300px] w-1/2 relative">
              <Image
                objectFit="cover"
                height={"100%"}
                src={food}
                alt="Food"
                className="w-full"
              />
              <h1 className="flex flex-col justify-center items-center text-xl font-bold text-white absolute inset-0 z-10">
                Food
              </h1>
            </div>
            <div className="h-[300px] w-1/2 relative">
              <Image
                objectFit="cover"
                height={"100%"}
                src={travel}
                alt="Travel"
                className="w-full"
              />
              <h1 className="flex flex-col justify-center items-center text-xl font-bold text-white absolute inset-0 z-10">
                Travel
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:px-3 px-0">
            <Heading size="md">
              Blog site (<span className="text-teal-400 text-sm">Ha blog</span>)
            </Heading>
            <Text py="2">
              This is a perfect blog site for you, I think you will love it. You can
              post your blog and comment, and you can also give feedback to other
              blogs.
            </Text>
            <Button
              onClick={() => navigate("/allblogs")}
              variant="solid"
              // colorScheme="#14B8A6"
              className="!bg-[#14B8A6] !text-white"
            >
              Explore more..
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };
  
  export default Banner;
  