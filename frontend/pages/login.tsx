import React, { useEffect } from 'react';
import { NextPage } from 'next';
import LoginPage from '../components/LoginPage/LoginPage';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const Login: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    if (user) {
        return (
            //loading text
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl font-bold">Loading...</h1>
            </div>
        )
    }

    return (
        <LoginPage />
    );
}

export default Login;
