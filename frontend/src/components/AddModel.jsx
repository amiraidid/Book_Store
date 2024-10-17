import React, { useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";

function AddModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({
    name: "",
    author: "",
    category: "",
    image: "",
    description: "",
  });

  const token = localStorage.getItem('token')

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleCreateBtn = async () => {
    try {
      const res = await fetch(`http://localhost:5000/admin/add-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': token,
        },
        body: JSON.stringify(inputs),
      });

      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      const result = await res.json();
      console.log(result);
      onClose(); 
      window.location.reload()
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button onClick={onOpen}>Add New Book</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create A New Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input ref={initialRef} placeholder="Enter Book Title/name" value={inputs.name} onChange={(e) => setInputs({...inputs, name: e.target.value})}/>
              </FormControl>

              <FormControl>
                <FormLabel>Author</FormLabel>
                <Input placeholder="Enter Author name" value={inputs.author} onChange={(e) => setInputs({...inputs, author: e.target.value})}/>
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input placeholder="Enter the Category" value={inputs.category} onChange={(e) => setInputs({...inputs, category: e.target.value})}/>
              </FormControl>

              <FormControl>
                <FormLabel>price</FormLabel>
                <Input placeholder="Enter the Category" value={inputs.price} onChange={(e) => setInputs({...inputs, price: e.target.value})}/>
              </FormControl>

              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input placeholder="Enter the Image" value={inputs.image} onChange={(e) => setInputs({...inputs, image: e.target.value})}/>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input placeholder="Description" value={inputs.description} onChange={(e) => setInputs({...inputs, description: e.target.value})}/>
              </FormControl>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateBtn}>Create</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddModel;
