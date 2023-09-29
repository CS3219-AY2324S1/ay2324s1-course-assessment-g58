import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {}

function Header(props: HeaderProps) {
    const { user, logout } = useAuth();
    const labelStyle = {
        marginLeft: '10px',
    }
    return (
        <header>
            {<h1 className="text-4xl font-bold">Welcome to PeerPrep</h1>}
            {user && (
                <>
                    <span className='text-3x1'>Welcome, {user}</span>
                    <button
                        style={labelStyle}
                        onClick={logout}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >Logout</button>
                </>
            )}
        </header>
    );
}

export default Header;