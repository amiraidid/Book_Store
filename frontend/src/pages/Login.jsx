import { Button, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"


function Login() {

    const [inputs, setInputs] = useState([])
    const toast = useToast()
    const navigate = useNavigate()


    const { setUser } = useContext(UserContext)

    const handleLogin = async () => {
        try {
            const userLogin = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs)
            });

            const result = await userLogin.json();
            if (userLogin.ok) { 
                setUser(result.token);
                localStorage.setItem('token', result.token);
                localStorage.setItem('role', result.role);

                if (result.role === 'admin') {
                    navigate("/admin"); 
                } else {
                    navigate("/");
                }

                toast({ title: "Account login", description: result.message, status: 'success', isClosable: true });
            } else {
                toast({ title: "Error", description: result.message, status: 'error', isClosable: true });
            }
        } catch (error) {
            toast({ title: "Error", description: error.message, status: 'error', isClosable: true });
        }
    };


    return (
        <div className="container mx-auto max-sm:w-64">
            <Heading className="text-center uppercase mt-8">Welcome Back🙌</Heading>
            <Heading fontSize={'1rem'} className="text-center ">Login Your Account</Heading>
            <FormControl maxW={'lg'} mx={'auto'} mt={'10'}>
                <FormLabel>Email</FormLabel>
                <Input type="email" id="email" placeholder="Enter Your Email" value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})}/>
                <FormLabel>Password</FormLabel>
                <Input type="password" id="password" placeholder="Enter Your Password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
                <Button onClick={handleLogin} mt={'4'} colorScheme="purple" variant={'solid'} type="submit">SUBMIT</Button>
            </FormControl>
        </div>
    )
}

export default Login