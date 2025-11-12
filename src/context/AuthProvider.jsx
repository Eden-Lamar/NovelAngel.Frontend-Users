import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }) => {
		const [auth, setAuth] = useState(() => {
				// Initialize from localStorage
				const token = localStorage.getItem('token');
				const user = localStorage.getItem('user');
				return token && user ? { token, user: JSON.parse(user) } : null;
		});
		const [loading, setLoading] = useState(false);

		// Keep auth synced with localStorage
		useEffect(() => {
				if (auth?.token) {
						localStorage.setItem('token', auth.token);
						localStorage.setItem('user', JSON.stringify(auth.user));
				} else {
						localStorage.removeItem('token');
						localStorage.removeItem('user');
				}
		}, [auth]);

		const login = async (email, password) => {
			setLoading(true);
			try {
					const response = await api.post('/user/login', {
							email,
							password
					});

					if (response.status === 200) {
							// Extract token from Authorization header
							const token = response.headers.authorization?.split(' ')[1];

							if (!token) throw new Error("No token received");
							
							// Fetch user data with the token
							const userResponse = await api.get('/user/profile', {
									headers: { Authorization: `Bearer ${token}` } // optional — api interceptor will catch this anyway
							});

							const authData = {
									token,
									user: userResponse.data.data
							};

							setAuth(authData);
							return { success: true, message: 'Login Successful' };
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
				const response = await api.post('/user/register', {
						username,
						email,
						password,
						role: 'user' // Default role
				});

				if (response.data.status === 'success') {
					// Auto-login after registration
					const loginResponse = await login(email, password);
					return loginResponse;
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
		};

		const refreshUser = async () => {
		try {
			const response = await api.get("/user/profile");
			if (response.status === 200) {
				const updatedUser = response.data.data;
				localStorage.setItem("user", JSON.stringify(updatedUser));
				setAuth((prev) => ({ ...prev, user: updatedUser }));
			}
		} catch (err) {
			console.error("Failed to refresh user:", err);
		}
	};

		const value = {
				auth,
				login,
				register,
				logout,
				loading,
				isAuthenticated: !!auth,
				setAuth,
				refreshUser
		};

		return (
				<AuthContext.Provider value={value}>
						{children}
				</AuthContext.Provider>
		);
};