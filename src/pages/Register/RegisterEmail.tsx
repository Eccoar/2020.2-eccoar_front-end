import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/Eccoar.png';
import InputBasic from '../../components/inputBasic';
import Button from '../../components/Button';
import emailValidation from '../../utils/emailValidation';
import arrow from '../../assets/arrow.svg';
import api from '../../services/api';

const RegisterEmail = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const history = useHistory();
	const { cpf, cep, adress, name, lastName } = history.location.state as {
		cpf: string;
		cep: string;
		adress: string;
		name: string;
		lastName: string;
	};
	const push = async () => {
		if (!email || !password) {
			setMessage('Preencha todos os campos corretamente');
		} else if (password.length < 6) {
			setMessage('A senha é muito curta!');
		} else if (!emailValidation(email)) {
			setMessage('Preencha o email corretamente!');
		} else {
			try {
				await api.post('/users', {
					email,
					name,
					lastName,
					password,
					cpf,
					cep,
					adress,
				});
				history.push('/home');
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<section className='containerRegister' data-testid='RegisterEmail'>
			<section className='containerRegister__arrowArea'>
				<img
					src={arrow}
					onClick={history.goBack}
					className='containerRegister__arrowArea-arrow'
				/>
			</section>
			<section className='containerRegister__componentsContainer'>
				<img src={logo} alt='' />
			</section>
			<section className='containerRegister__formsContainer'>
				<section className='containerRegister__formsContainer-section'>
					<section className='containerRegister__formsContainer-input'>
						<InputBasic
							label='E-MAIL:'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							testId='inputEmail'
						/>
					</section>
					<section className='containerRegister__formsContainer-input'>
						<InputBasic
							label='SENHA:'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							inputContentType='password'
							testId='inputPassword'
						/>
					</section>
				</section>
				{message != '' ? (
					<div className='containerRegister__passwordValidation'>
						{message}
					</div>
				) : null}
				<section className='containerRegister__buttonsContainer-buttonSize'>
					<Button
						text='CONTINUAR'
						onClick={() => push()}
						pattern='primary'
						icon='next'
					/>
				</section>
			</section>
		</section>
	);
};

export default RegisterEmail;
