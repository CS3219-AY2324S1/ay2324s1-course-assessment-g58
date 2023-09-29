import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import ProfilePage from '@/components/ProfilePage/ProfilePage';

const Profile: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            alert("login in first");
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

    return (
        <ProfilePage />
    );
}

export default Profile;
