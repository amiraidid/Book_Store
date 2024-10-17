import {
  Box,
  Grid,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Select,
  Divider,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CheckOut() {
  const [productInfo, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getCartListFromDatabase = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/books/checkout/${params.id}`
        );
        if (!response.ok) {
          throw new Error("an error happen");
        }
        const result = await response.json();
        setProductInfo(result.book);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(true);
      }
    };
    getCartListFromDatabase();
  }, [params.id]);

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" thickness="4px" color="purple.500" />
        <Text ml="3">Loading, please wait...</Text>
      </Center>
    );
  }

  return (
    <div className="container mx-auto">
      <Box p={8} maxWidth="1200px" mx="auto">
        <Heading mb={6}>Checkout</Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={10}>
          {/* Shipping Information */}
          <Box>
            <Heading size="md" mb={4}>
              Shipping Information
            </Heading>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input placeholder="John Doe" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input type="email" placeholder="john.doe@example.com" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input placeholder="123 Main St" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input placeholder="New York" />
              </FormControl>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Select placeholder="Select state">
                  <option value="NY">New York</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Zip Code</FormLabel>
                <Input placeholder="10001" />
              </FormControl>
            </Stack>
          </Box>

          {/* Order Summary & Payment Method */}
          <Box>
            <Heading size="md" mb={4}>
              Order Summary
            </Heading>
            <Box mb={6}>
              <Text key={productInfo._id} mb={2}>Book Name: <span className="text-xl font-medium">{productInfo.name}</span></Text>
              <Text key={productInfo._id} mb={2}>Price: <span className="text-xl font-medium">${productInfo.price}</span></Text>
            </Box>
            <Divider mb={6} />
            <Heading size="md" mb={4}>
              Payment Method
            </Heading>
            <FormControl isRequired mb={4}>
              <FormLabel>Card Number</FormLabel>
              <Input placeholder="1234 5678 9012 3456" />
            </FormControl>
            <Flex gap={4} mb={6}>
              <FormControl isRequired>
                <FormLabel>Expiry Date</FormLabel>
                <Input placeholder="MM/YY" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>CVC</FormLabel>
                <Input placeholder="123" />
              </FormControl>
            </Flex>
            <Button colorScheme="teal" size="lg" width="full">
              Place Order
            </Button>
          </Box>
        </Grid>
      </Box>
    </div>
  );
}

export default CheckOut;
