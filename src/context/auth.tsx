import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import jwt_decode from 'jwt-decode';
import api from '../services/api';

interface IAuthContext {
	userId: string;
	token: string;
	handleLogin: (email: string, password: string) => Promise<void>;
	handleLogout: () => void;
}

interface IJWTPayload {
	user_id: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
	const [userId, setUserId] = useState('');
	const [token, setToken] = useState('');
	const history = useHistory();

	const errorStatus = {
		'User not verified': () =>
			alert(
				'O link de confirmação foi enviado ao seu email. Favor verificar.',
			),
		'The password is invalid or the user does not have a password.': () =>
			alert('Senha inválida.'),
		'User not found': () => alert('Email inválido!'),
	};

	const handleLogin = async (email: string, password: string) => {
		try {
			if (!email || !password) {
				alert('Ambos os campos devem ser preenchidos');
				return;
			}
			const resp = await api.post('/signin', { email, password });
			const _token = resp.data.token;
			const _userId = jwt_decode<IJWTPayload>(resp.data.token).user_id;
			localStorage.setItem('@eccoar/token', _token);
			localStorage.setItem('@eccoar/userID', _userId);
			api.defaults.headers.common['authorization'] = _token;
			setToken(_token);
			setUserId(_userId);
			history.replace('/home');
		} catch (error) {
			console.log(error.response);
			if (
				Object.keys(errorStatus).includes(error.response.data.message)
			) {
				errorStatus[
					error.response.data.message as keyof typeof errorStatus
				]();
			} else if (
				Object.keys(errorStatus).includes(
					error.response.data.message.message,
				)
			) {
				errorStatus[
					error.response.data.message
						.message as keyof typeof errorStatus
				]();
			} else {
				alert('Um erro desconhecido ocorreu');
			}
		}
	};

	const handleLogout = () => {
		setToken('');
		setUserId('');
		localStorage.removeItem('@eccoar/token');
		localStorage.removeItem('@eccoar/userID');
		api.defaults.headers.common['authorization'] = '';
	};

	useEffect(() => {
		const _token = localStorage.getItem('@eccoar/token');
		const _userId = localStorage.getItem('@eccoar/userID');
		if (_token && _userId) {
			setToken(_token);
			setUserId(_userId);
			api.defaults.headers.common['authorization'] = _token;
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ userId, token, handleLogin, handleLogout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
