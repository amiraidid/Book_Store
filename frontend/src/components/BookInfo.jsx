/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Center, Spinner, Text, Button, useToast } from "@chakra-ui/react";
import EditModel from "./EditModel";
import { useDisclosure } from "@chakra-ui/react";

function BookInfo({ loading, listOfBooks }) {
  const [books, setBooks] = useState(listOfBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    setBooks(listOfBooks);
  }, [listOfBooks]);

  const updateBook = (book) => {
    setSelectedBook(book);
    onOpen();
  };

  const deleteBook = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/book/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!res.ok) {
        throw new Error(res.status);
      }
      const result = await res.json();
      toast({
        title: "Book deletion",
        description: result.message,
        status: "success",
        isClosable: true,
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      toast({ title: "Error", description: error.message, status: "error", isClosable: true });
    }
  };

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" thickness="4px" color="purple.500" />
        <Text ml="3">Loading, please wait...</Text>
      </Center>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {books.map((book) => (
            <Table.Row key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.name}
              </Table.Cell>
              <Table.Cell>{book.author}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>${book.price}</Table.Cell>
              <Table.Cell>
                <Button variant="outline" onClick={() => updateBook(book)} colorScheme="purple">
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => deleteBook(book._id)}
                  color="red"
                  ml="3"
                  colorScheme="purple"
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {selectedBook && (
        <EditModel isOpen={isOpen} onClose={onClose} book={selectedBook} />
      )}
    </div>
  );
}

export default BookInfo;
