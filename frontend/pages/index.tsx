import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import LandingPage from '../components/LandingPage/LandingPage';

function Home() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
          router.push('/login');
        }
    }, [user]);

    if (!user) {
        return (
            //loading text
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl font-bold">Loading...</h1>
            </div>
        )
    }

    return <LandingPage />;
}

export default Home;
