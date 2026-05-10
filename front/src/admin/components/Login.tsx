import React, { useState, useEffect } from 'react';
import '../../css/admin.css';
import { useAdmin } from '../../context/adminContext';
import Button from '../../components/Button/Button';

export default function Login() {
    const {
        username,
        setUsername,
        password,
        setPassword,
        isLogin,
        error,
        handleSubmit,
        toggleForm,
    } = useAdmin();
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    useEffect(() => {
        if (username.trim().length === 0) {
            setUsernameError('Username is required');
        } else if (username.trim().length < 4) {
            setUsernameError('Username must be at least 4 characters long');
        } else {
            setUsernameError(null);
        }

        if (password.trim().length === 0) {
            setPasswordError('Password is required');
        } else if (password.trim().length < 4) {
            setPasswordError('Password must be at least 4 characters long');
        } else {
            setPasswordError(null);
        }
    }, [username, password]);

    const isFormValid = !usernameError && !passwordError;

    return (
        <div className="login-container">
            <h2 className="tic">
                {isLogin ? 'Admin Login' : 'Admin Registration'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ border: usernameError ? '1px solid red' : '' }}
                    />
                    {usernameError && <p className="error">{usernameError}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ border: passwordError ? '1px solid red' : '' }}
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                </div>
                {error && <p className="error">{error}</p>}
                <Button isActive={isFormValid} onClick={handleSubmit}>
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </form>
            <p className="p">
                {isLogin ? (
                    <>
                        Don't have an account?{' '}
                        <span onClick={toggleForm} className="toggle-link">
                            Register
                        </span>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <span onClick={toggleForm} className="toggle-link">
                            Login
                        </span>
                    </>
                )}
            </p>
        </div>
    );
}
