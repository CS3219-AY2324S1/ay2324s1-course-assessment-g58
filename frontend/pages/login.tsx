// From https://codepen.io/amit0009/pen/ZEaygxa
import React, { useState, CSSProperties } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const styles: Record<string, CSSProperties> = {
    main: {
        height: '90vh',
        width: '100vw',
        position: 'relative',
        margin: '0 auto',
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: '#f0f2f5',
        color: '#1c1e21'
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1000px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    colmForm: {
        flex: '0 0 40%',
        textAlign: 'center'
    },
    formContainer: {
        backgroundColor: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxWidth: '400px'
    },
    inputAndButton: {
        width: '100%',
        margin: '5px 0',
        height: '45px',
        verticalAlign: 'middle',
        fontSize: '16px'
    },
    input: {
        border: '1px solid #dddfe2',
        color: '#1d2129',
        padding: '0 8px',
        outline: 'none',
    },
    btnLogin: {
        backgroundColor: '#1877f2',
        border: 'none',
        borderRadius: '6px',
        fontSize: '20px',
        padding: '0 16px',
        color: '#ffffff',
        fontWeight: '700'
    },
    anchor: {
        display: 'block',
        color: '#1877f2',
        fontSize: '14px',
        textDecoration: 'none',
        padding: '10px 0 20px',
        borderBottom: '1px solid #dadde1',
    }
};

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async () => {
        await login(email, password);
        router.push('/');
    };
  
    return (
      <div style={styles.main}>
        <div style={styles.row}>
            <div style={styles.colmForm}>
                <div style={styles.formContainer}>
                    <input
                        type="text"
                        placeholder="Email address"
                        style={{ ...styles.inputAndButton, ...styles.input}}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={{ ...styles.inputAndButton, ...styles.input}}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button style={styles.btnLogin} onClick={handleLoginClick}>Login</button>
                    <a 
                        href="#"
                        style={{ ...styles.anchor}}
                    >
                        Forgotten password?
                    </a>
                </div>
            </div>
        </div>
      </div>
    );
};
  
export default LoginPage;
