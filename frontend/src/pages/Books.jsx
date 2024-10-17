import {
  Input,
  InputGroup,
  InputRightAddon,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import { BookComp } from "../components";
import { useEffect, useState, useRef, useCallback } from "react";

function Books() {
  const [listOfBooks, setListOfBooks] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    async function getListOfBooks() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/books");
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        if (data) {
          setListOfBooks(data?.books);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    getListOfBooks();
  }, []);

  const fetchSuggestions = useCallback(
    async (query) => {
      try {
        const res = await fetch(`http://localhost:5000/books/suggestions?query=${query}`);
        if (!res.ok) {
          throw new Error("Failed to fetch suggestions");
        }
        const result = await res.json();
        setSuggestions(result);
      } catch (error) {
        console.error(error.message);
      }
    },
    []
  );

  // Debounce function to limit API calls
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedFetchSuggestions = useCallback(
    debounce((query) => fetchSuggestions(query), 300),
    [fetchSuggestions]
  );

  useEffect(() => {
    if (searchInput) {
      debouncedFetchSuggestions(searchInput);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSearchResult(null);
    }
  }, [searchInput, debouncedFetchSuggestions]);

  async function handleSearchBtn() {
    console.log(searchInput);
    if (!searchInput) return;

    try {
      setSearchLoading(true);
      const res = await fetch(`http://localhost:5000/books/book/${searchInput}`);
      if (!res.ok) {
        throw new Error("An error has happened");
      }
      const result = await res.json();
      setSearchResult(result.book ? [result.book] : []);
    } catch (error) {
      console.log(error.message);
      setSearchResult([]);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div className="container mx-auto">
      <div className="my-10 flex flex-wrap justify-between items-center">
        <h1 className="flex-1 text-2xl font-bold text-gray-800 mx-4 max-sm:mb-6">Latest Books</h1>
        <div className="flex-1 flex items-end lg:ml-[30rem] mx-2 w-80 relative" ref={inputRef}>
          <InputGroup>
            <Input
              type="search"
              placeholder="Search Your Books here..."
              w="lg"
              textTransform="capitalize"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
            />
            <InputRightAddon onClick={handleSearchBtn}>Search</InputRightAddon>
          </InputGroup>

          {showSuggestions && suggestions.length > 0 && (
            <Box
              bg="white"
              border="1px solid gray"
              borderRadius="md"
              mt="2"
              position="absolute"
              zIndex="10"
              w="full"
              boxShadow="md"
            >
              <List>
                {suggestions.map((suggestion, index) => (
                  <ListItem
                    key={index}
                    p="2"
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    onClick={() => {
                      setSearchInput(suggestion);
                      setShowSuggestions(false);
                      handleSearchBtn();
                    }}
                  >
                    {suggestion}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </div>
      </div>
      <div>
        <BookComp
          listOfBooks={searchResult !== null ? searchResult : listOfBooks}
          loading={loading || searchLoading}
          isSearching={searchResult !== null}
        />
      </div>
    </div>
  );
}

export default Books;
