/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  useToast,
} from "@chakra-ui/react";

function EditModel({ isOpen, onClose, book }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast()
  const token = localStorage.getItem('token')
  const [inputs, setInputs] = useState({
    name: "",
    author: "",
    category: "",
    image: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (book) {
      setInputs({
        name: book.name,
        author: book.author,
        category: book.category,
        image: book.image || "",
        description: book.description || "",
        price: book.price || "",
      });
    }
  }, [book]);

  const handleUpdateBtn = async () => {
    try {
      const res = await fetch(`http://localhost:5000/admin/book/update/${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (res.ok) {
        // Optionally, handle the success case here, like showing a toast or updating local state if needed
        toast({
          title: "Book Updated",
          description: "The book has been successfully updated.",
          status: "success",
          isClosable: true,
        });
        onClose(); // Close the modal after successful update
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };
  

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update A Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Book Title/name"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Enter Author name"
                value={inputs.author}
                onChange={(e) => setInputs({ ...inputs, author: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder="Enter the Category"
                value={inputs.category}
                onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Enter the Price"
                value={inputs.price}
                onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                placeholder="Enter the Image"
                value={inputs.image}
                onChange={(e) => setInputs({ ...inputs, image: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={inputs.description}
                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
              />
            </FormControl>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateBtn}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditModel;
