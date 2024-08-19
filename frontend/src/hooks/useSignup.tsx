import { useState } from 'react'
import { useAuthContext } from '../context/auth.context';

type SignUpInputs = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;  // either 'male' or 'female'
}

const useSignup = () => {
    const [ loading, setIsLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();

    const handleSignup = async (inputs: SignUpInputs ) => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });            
            console.log({ res })
            const data = await res.json();

            if (!res.ok) {
                throw new Error(`Failed to signup: ${data.error}`);
            }
            setAuthUser(data);
        } catch (error: any) {
            console.error("Failed to signup: ", error.message);
            // toast.error(error.message);
        } finally {
            setIsLoading(false);
        }


    }

    return { handleSignup, loading }
}

export default useSignup