/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  ButtonGroup,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function BookComp({ listOfBooks, loading, isSearching }) {
  
   const token = localStorage.getItem('token')
  const { addToCarts } = useContext(CartContext);


  if (loading) { 
    return (
      <Center>
        <Spinner size="xl" thickness="4px" color="purple.500" />
        <Text ml="3">Loading, please wait...</Text>
      </Center>
    );
  }

  if (!listOfBooks || listOfBooks.length === 0) {
    return (
      <Center>
        <Text>{isSearching ? "No book found for your search." : "No books available at the moment."}</Text>
      </Center>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
      {listOfBooks.map((book) => (
        <Card maxW="lg" key={book._id}>
          <CardBody>
            <Link to={`/book/${book._id}`}>
              <Image
                src={book.image}
                alt={book.name}
                objectFit="cover"
                w="100%"
                h="250px"
                borderRadius="md"
              />
            </Link>
            <VStack justifyContent="start" alignItems="start" spacing="2" mt="4">
              <Heading as="h1" size="md">
                {book.name}
              </Heading>
              <Text>Author: {book.author}</Text>
              <Text>Category: {book.category}</Text>
            </VStack>
            <HStack mt="4">
              <Text fontWeight="bold">Price: ${book.price}</Text>
            </HStack>
            <ButtonGroup spacing="2" mt="4">
              <Link to={`/books/checkout/${book._id}`}><Button variant="solid" colorScheme="purple">
                Buy now
              </Button></Link>
              <Button onClick={() => addToCarts(book._id, token)} variant="outline" colorScheme="purple">
                Add to cart
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default BookComp;
