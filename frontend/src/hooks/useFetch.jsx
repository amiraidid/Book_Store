import { useState, useEffect } from "react";

function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [listOfBooks, setListOfBooks] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  
  useEffect(() => {
    async function getListOfBooks() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        if (data) {
          setListOfBooks(data?.books);
          setListOfUsers(data?.users);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    getListOfBooks();
  }, [url]);

  return { listOfBooks, listOfUsers, loading };
}

export default useFetch;
