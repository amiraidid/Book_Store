import {
  Button,
  Heading,
  Image,
  Center,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mx-auto">
      <Center>
        <VStack>
          <Image src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg" alt="" w={'320px'} />
          <Heading>404📡 Page Not Found</Heading>
          <Link to={"/"}>
            <Button colorScheme="teal" size="lg" width="full">
              Back To Home
            </Button>
          </Link>
        </VStack>
      </Center>
    </div>
  );
}

export default NotFound;
