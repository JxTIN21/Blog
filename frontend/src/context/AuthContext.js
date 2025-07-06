import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as authLogin, register as authRegister } from '../services/authService';

export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        console.log('Checking stored auth data:', { 
            hasUser: !!storedUser, 
            hasToken: !!storedToken 
        });

        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setToken(storedToken);
                setIsAuthenticated(true);
                console.log('Auth restored from localStorage:', parsedUser);
            } catch (e) {
                console.error('Error parsing stored user data:', e);
                // Clear invalid data
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);
    
    const login = async (username, password) => {
        try {
            console.log('Attempting login...');
            const response = await authLogin(username, password);
            console.log('Login response:', response);
            
            const { access_token, user } = response;
            
            if (!access_token || !user) {
                throw new Error('Invalid response format: missing token or user data');
            }
            
            // Store in state
            setUser(user);
            setToken(access_token);
            setIsAuthenticated(true);
            
            // Store in localStorage for persistence
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            
            console.log('Login successful, user:', user);
            console.log('Token stored:', access_token ? 'Yes' : 'No');
            
            return true;
        } catch (error) {
            console.error('Login failed: ', error);
            return false;
        }
    };

    const register = async (username, email, password) => {
        try {
            console.log('Attempting registration...');
            const response = await authRegister(username, email, password);
            console.log('Registration response:', response);
            return true;
        } catch (error) {
            console.error('Registration failed: ', error);
            throw error; // Re-throw so the component can handle it
        }
    };

    const logout = () => {
        console.log('Logging out...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        token,
        isAuthenticated,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};