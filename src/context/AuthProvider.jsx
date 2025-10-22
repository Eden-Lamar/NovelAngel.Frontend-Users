import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }) => {
		const [auth, setAuth] = useState(() => {
				// Initialize from localStorage
				const token = localStorage.getItem('token');
				const user = localStorage.getItem('user');
				return token && user ? { token, user: JSON.parse(user) } : null;
		});
		const [loading, setLoading] = useState(false);

		// Set axios default header when auth changes
		useEffect(() => {
				if (auth?.token) {
						axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
						localStorage.setItem('token', auth.token);
						localStorage.setItem('user', JSON.stringify(auth.user));
				} else {
						delete axios.defaults.headers.common['Authorization'];
						localStorage.removeItem('token');
						localStorage.removeItem('user');
				}
		}, [auth]);

		const login = async (email, password) => {
				setLoading(true);
				try {
						const response = await axios.post('http://localhost:3000/api/v1/user/login', {
								email,
								password
						});

						if (response.status === 200) {
								// Extract token from Authorization header
								const token = response.headers.authorization?.split(' ')[1];
								
								if (token) {
										// Fetch user data with the token
										const userResponse = await axios.get('http://localhost:3000/api/v1/user/profile', {
												headers: { Authorization: `Bearer ${token}` }
										});

										const authData = {
												token,
												user: userResponse.data.data
										};

										setAuth(authData);
										return { success: true, message: 'Login successful!' };
								} else {
										throw new Error('No token received');
								}
						}
				} catch (error) {
						const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Login failed';
						return { success: false, error: errorMessage };
				} finally {
						setLoading(false);
				}
		};

		const register = async (username, email, password) => {
				setLoading(true);
				try {
						const response = await axios.post('http://localhost:3000/api/v1/user/register', {
								username,
								email,
								password,
								role: 'user' // Default role
						});

						if (response.data.status === 'success') {
								// Auto-login after registration
								return await login(email, password);
						}
				} catch (error) {
						const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Registration failed';
						return { success: false, error: errorMessage };
				} finally {
						setLoading(false);
				}
		};

		const logout = () => {
				setAuth(null);
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				delete axios.defaults.headers.common['Authorization'];
		};

		const value = {
				auth,
				login,
				register,
				logout,
				loading,
				isAuthenticated: !!auth
		};

		return (
				<AuthContext.Provider value={value}>
						{children}
				</AuthContext.Provider>
		);
};