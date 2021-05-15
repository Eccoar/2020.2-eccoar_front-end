import { useEffect, useState } from 'react';
import Button from '../components/Button';
import InputBasic from '../components/inputBasic';
import Logo from '../assets/logo.svg';
import arrow from '../assets/arrow.svg';
import { useAuth } from '../context/auth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
	const { userId, handleLogin } = useAuth();
	const history = useHistory();

	useEffect(() => {
		if (userId) {
			history.replace('/home');
		}
	}, []);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className='login'>
			<div className='login__arrowContainer'>
				<img
					src={arrow}
					onClick={history.goBack}
					className='login__arrow'
				/>
			</div>
			<div className='login__container'>
				<img src={Logo} className='login__logo' />
				<div className='login__inputContainer'>
					<InputBasic
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						label='E-mail:'
					/>
					<InputBasic
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						label='Senha:'
						inputContentType='password'
					/>
				</div>
			</div>
			<div className='login__buttonContainer'>
				<Link to='/register/name' className='login__registerLink'>
					Não tem conta? Cadastre-se
				</Link>
				<Button
					text='Entrar'
					icon='next'
					pattern='secondary'
					onClick={() => handleLogin(email, password)}
				/>
			</div>
		</div>
	);
};

export default Login;
