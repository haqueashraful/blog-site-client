import { useContext } from "react";
import { Box, Text, Avatar, Heading, VStack, Center } from "@chakra-ui/react";
import { Context } from "../Context/MyContext";

const Subscriber = () => {
  const { user } = useContext(Context);

  return (
    <Center>
      <Box 
        maxW="md" 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        p={4} 
        mt={8} 
        boxShadow="lg"
      >
        <VStack spacing={4} align="center">
          <Avatar size="xl" name={user.displayName} src={user.photoURL} />
          <Heading as="h3" size="lg" color={"black"}>{user.displayName}</Heading>
          <Text fontSize="xl" size={"lg"} color={"black"}>You are now part of our premium membership</Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default Subscriber;
