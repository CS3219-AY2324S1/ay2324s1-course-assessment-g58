import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginBox from './LoginBox';
import SignupBox from './SignupBox';

const LoginPage = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);  // Default to login mode
    
    useEffect(() => {
        const { mode } = router.query;
        setIsLogin((prev) =>
          mode === 'register' ? false : mode === 'login' ? true : prev
        );
    }, [router]);

    return isLogin ? (
        <LoginBox />
    ) : (
        <SignupBox />
    );
}

export default LoginPage;
