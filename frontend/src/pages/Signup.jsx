import { useState } from "react"
import { Button, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react"

function Signup() {

    const [inputs, setInputs] = useState({})
    const toast = useToast()

    const handleSignUP = async() => {
        try {
            const userInputs =  await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs)
            })
            const data = await userInputs.json();
            toast({title: 'Account Created', description: data.message, status: "success", isClosable: true})            
        } catch (error) {
            toast({title: 'Error', description: error.message, status: "error", isClosable: true})
        }
    }

    return (
        <div className="container mx-auto max-sm:w-64">
            <Heading as={'h1'} className="text-center uppercase">Welcome To BOOKIA</Heading>
            <Heading fontSize={'1rem'} className="text-center">Signup Your Account</Heading>
            <FormControl maxW={'lg'} mx={'auto'} mt={'10'} bg={'whiteAlpha.700'}>
                <FormLabel>Name</FormLabel>
                <Input type="text" id="name" placeholder="Enter Your Name" value={inputs.name} onChange={(e) => setInputs({...inputs, name: e.target.value})}/>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" id="lastname" placeholder="Enter Your LastName" value={inputs.lastName} onChange={(e) => setInputs({...inputs, lastName: e.target.value})}/>
                <FormLabel>Email</FormLabel>
                <Input type="email" id="email" placeholder="Enter Your Email" value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})}/>
                <FormLabel>Password</FormLabel>
                <Input type="password" id="password" placeholder="Enter Your Password" value={inputs.passwod} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
                <Button onClick={handleSignUP} mt={'4'} colorScheme="purple" variant={'solid'} type="submit">SUBMIT</Button>
            </FormControl>
        </div>
    )
}

export default Signup