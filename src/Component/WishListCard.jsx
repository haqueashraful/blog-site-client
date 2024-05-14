import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/MyContext';

const WishListCard = ({ item }) => {
    const navigate = useNavigate();
    const { handleRemoveWishlist } = useContext(Context);

    const { _id, title, image_url, email, long_description, short_description, category } = item;

    // Truncate the long description to 100 characters if needed
    const truncatedDescription = long_description?.length > 100 ? `${long_description.slice(0, 100)}...` : long_description;

    return (
        <Card maxW="sm">
            <CardBody>
                <Image
                    src={image_url}
                    alt={title}
                    borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                    <Heading size="md">{title}</Heading>
                    <Text className='text-white px-2  text-center text-base py-1 bg-secondary w-1/3 rounded-l-full rounded-r-full' fontSize="2xl">
                        {category}
                    </Text>
                    <Text>
                        {short_description}
                    </Text>
                    <Text color="blue.600" fontSize="lg">
                        {truncatedDescription}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing="2">
                    <Button onClick={() => handleRemoveWishlist(_id)} variant="solid" colorScheme="blue">
                        Remove wishlist
                    </Button>
                    <Button onClick={() => navigate(`/blogdetails/${_id}`)} variant="ghost" colorScheme="blue">
                        Details
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default WishListCard;
