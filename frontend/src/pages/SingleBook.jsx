import { Center, Spinner, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { SingleBookComp } from "../components"
import { useParams } from "react-router-dom"


function SingleBook() {

  const [bookInfo, setBookInfo] = useState([])
  const [loading, setLoading] = useState(false)
  const params  = useParams()

  useEffect(() => {
    const fetchSingleBookInfo = async() => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/books/bookid/${params.id}`)

        if (!response.ok) {
          throw new Error("An Expected Error Happen!!")
        }

        const result = await response.json()
        setBookInfo(result.book)
        setLoading(false)

      } catch (error) {
        console.log(error.message)
        setLoading(true)
      }
    }

    fetchSingleBookInfo()
  }, [params.id])

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" thickness="4px" color="purple.500" />
        <Text ml="3">Loading, please wait...</Text>
      </Center>
    )
  }

  return (
    <div className="container mx-auto">
      <SingleBookComp bookInfo={bookInfo}/>
    </div>
  )
}

export default SingleBook