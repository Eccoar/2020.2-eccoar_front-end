import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/Eccoar.png';
import InputBasic from '../../components/inputBasic';
import Button from '../../components/Button';
import arrow from '../../assets/arrow.svg';
import { useAuth } from '../../context/auth';

const RegisterName = () => {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');

	const history = useHistory();
	const { userId } = useAuth();
	useEffect(() => {
		if (userId) {
			history.replace('/home');
		}
	}, []);

	const push = () => {
		if (!name || !lastName) {
			alert('Preencha todos os campos corretamente!');
		} else {
			history.push('/register/adress', {
				name,
				lastName,
			});
		}
	};

	return (
		<section className='containerRegister' data-testid='RegisterName'>
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
							label='SEU NOME:'
							value={name}
							onChange={(e) => setName(e.target.value)}
							testId='inputNome'
						/>
					</section>
					<section className='containerRegister__formsContainer-input'>
						<InputBasic
							label='E SOBRENOME:'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							testId='inputSobrenome'
						/>
					</section>
				</section>
				<section className='containerRegister__buttonsContainer-buttonSize'>
					<Link to='/login' className='login__registerLink'>
						Já tem conta?
					</Link>
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

export default RegisterName;
