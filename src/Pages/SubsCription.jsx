import  { useContext, useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Context } from "../Context/MyContext";

const Subscription = () => {
    const {user, isChecked} = useContext(Context)
  const [formData, setFormData] = useState({
    name: user.displayName || "",
    email: user.email || "",
    phone: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("https://blog-site-server-lemon.vercel.app/payment", formData);
        console.log(response.data.url)
      if (response.data.url) {
        window.location.replace(response.data.url);
      } else {
        toast({
          title: "Error",
          description: "An error occurred while processing your payment.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Error",
        description: "An error occurred while processing your payment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="lg">
        <Heading as="h1" size="lg" color={isChecked ? "white" : "black"}>payment intregration for bkash (Testing)</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="phone" isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Subscribe
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Subscription;
