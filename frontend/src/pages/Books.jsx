import {
  Input,
  InputGroup,
  InputRightAddon,
  
} from "@chakra-ui/react";
import { BookComp } from "../components";
import { useEffect, useState, useRef } from "react";

function Books() {
  const [listOfBooks, setListOfBooks] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const inputRef = useRef(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/books`);
      if (!response.ok) throw new Error(response.status);

      const data = await response.json();
      setListOfBooks(data?.books || []);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = async () => {
    if (!searchInput) return;

    try {
      setSearchLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books/book/${searchInput}`);
      if (!res.ok) throw new Error("Error occurred while fetching book");

      const result = await res.json();
      setSearchResult(result.book ? [result.book] : []);
    } catch (error) {
      console.error("Error fetching book:", error.message);
      setSearchResult([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-10 flex flex-wrap justify-between items-center">
        <h1 className="flex-1 text-2xl font-bold text-gray-800 mx-4 max-sm:mb-6">
          Latest Books
        </h1>
        <div
          className="flex-1 flex items-end lg:ml-[30rem] mx-2 w-80 relative"
          ref={inputRef}
        >
          <InputGroup>
            <Input
              type="search"
              placeholder="Search Your Books here..."
              w="lg"
              textTransform="capitalize"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <InputRightAddon onClick={handleSearch}>Search</InputRightAddon>
          </InputGroup>
        </div>
      </div>
      <div>
        <BookComp
          listOfBooks={searchResult ?? listOfBooks}
          loading={loading || searchLoading}
          isSearching={searchResult !== null}
        />
      </div>
    </div>
  );
}

export default Books;
