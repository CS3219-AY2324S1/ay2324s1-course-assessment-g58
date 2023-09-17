/* Common naviagtion bar across whole app */
import React from 'react';
import Link from 'next/link';

const NavigationBar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <ul className="flex justify-between w-full max-w-screen-md mx-auto">
                <li>
                    <Link href="/" className="text-white hover:bg-blue-500 px-3 py-1 rounded-md">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/profile" className="text-white hover:bg-blue-500 px-3 py-1 rounded-md">
                        Profile
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
