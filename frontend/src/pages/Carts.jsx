import { useContext, useEffect, useState } from "react"
import { Button, Card, CardBody, Heading, Image, Stack, Text, Spacer, Center } from "@chakra-ui/react"
import { CartContext } from "../context/CartContext"
import { jwtDecode } from "jwt-decode";

function Carts() {
    const [cartList, setCartList] = useState([])
    const [loading, setLoading] = useState(false)
    const { removeFromCarts } = useContext(CartContext)
    const token = localStorage.getItem('token')

    const decoded = jwtDecode(token);
    const currentUser = decoded.id

    useEffect(() => {
        const getCartListFromDatabase = async() => {
            try {
                setLoading(true)
                const response = await fetch('http://localhost:5000/cartlist')
                if (!response.ok) {
                    throw new Error("an error happen")
                }
                const result = await response.json()
                setCartList(result.cartListData)
                setLoading(false)
            } catch (error) {
                console.log(error.message)
                setLoading(true)
            }
        }
        getCartListFromDatabase()
    }, [])

    if (loading) return <Center><Text>Loading....</Text></Center>

  return (
    <div className="container mx-auto mt-6">
        <div className="md:mx-8 max-sm:mx-8">
            {
                cartList && cartList.length > 0 ? cartList.map((cartItem) => {
                    return cartItem.user === currentUser && (
                        <Card key={cartItem._id} direction={{ base: 'column', sm: 'row' }} mt={'12'} overflow='hidden' variant='outline'>
                            <Image src={cartItem.image} alt={cartItem.name} objectFit='cover' h={'180px'} maxW={{ base: '100%', sm: '200px' }}/>
                            <Stack>
                                <CardBody>
                                    <Heading size={'md'}>{cartItem.name}</Heading>
                                    <Text fontWeight={'bold'}>${cartItem.price}</Text>
                                    <Text>Author: <span className="font-bold">{cartItem.author}</span></Text>
                                    <Text>Category: <span className="font-bold">{cartItem.category}</span></Text>
                                   <Button onClick={() => removeFromCarts(cartItem._id, token)} variant="ghost" mt={'1'} border={'2px'} colorScheme="purple">Remove From Cart</Button>
                                </CardBody>
                            </Stack>
                            <Spacer />
                            {/* <Stack  spacing={2} align='stretch' className="ml-5">
                                <Link to={`/books/checkout/${cartItem._id}`}><Button variant="solid" colorScheme="purple" mt={5}>Buy Now</Button></Link><br />
                                <Button onClick={() => removeFromCarts(cartItem._id, token)} variant="ghost" colorScheme="purple">Remove From Cart</Button>
                            </Stack> */}
                        </Card>
                    )
                }) : (
                    <Center>
                        <Text>Your CartList is Empaty</Text>
                    </Center>
                )
            }
        </div>
    </div>
  )
}

export default Carts