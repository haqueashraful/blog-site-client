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
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1,
        }}
        className="my-10 px-2 lg:px-0"
      >
        <div className="flex flex-col lg:flex-row gap-3 justify-center items-center">
          <div className="flex">
            <div className="h-[300px] relative">
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                height={"full"}
                src={techno}
               
              />
              <h1 className="flex flex-col justify-center items-center text-xl font-bold text-white absolute inset-0 z-10">
                Technology
              </h1>
            </div>
            <div className="h-[300px] relative">
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                height={"full"}
                src={food}
                alt="Food"
               
              />
              <h1 className="flex flex-col justify-center items-center text-xl font-bold text-white absolute inset-0 z-10">
                Food
              </h1>
            </div>
            <div className="h-[300px] relative">
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                height={"full"}
                src={travel}
                alt="Travel"
               
              />
              <h1 className="flex flex-col justify-center items-center text-xl font-bold text-white absolute inset-0 z-10">
                Travel
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:px-3 px-0">
            <Heading size="md">
              Blog site (<span className="text-secondary text-sm">Ha blog</span>)
            </Heading>
            <Text py="2">
              This is a perfect blog site for you, I think you will love it. You can
              post your blog and comment, and you can also give feedback to other
              blogs.
            </Text>
            <Button
              onClick={() => navigate("/allblogs")}
              variant="solid"
              colorScheme="blue"
            >
              Explore more..
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };
  
  export default Banner;
  