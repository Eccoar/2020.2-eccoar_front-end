import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/Eccoar.png';
import InputBasic from '../../components/inputBasic';
import Button from '../../components/Button';
import arrow from '../../assets/arrow.svg';
import { useAuth } from '../../context/auth';

const RegisterAddress = () => {
	const [cpf, setCpf] = useState('');
	const [cep, setCep] = useState('');
	const [address, setAddress] = useState('');
	const history = useHistory();
	const { userId } = useAuth();
	useEffect(() => {
		if (userId) {
			history.replace('/home');
		}
	}, []);
	const { name, lastName } = history.location.state as {
		name: string;
		lastName: string;
	};

	const push = () => {
		if (!cpf || !cep || !address) {
			alert('Preencha todos os campos corretamente!');
		} else {
			history.push('/register/email', {
				cpf,
				cep,
				address,
				name,
				lastName,
			});
		}
	};
	return (
		<section className='containerRegister' data-testid='RegisterAddress'>
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
							label='CPF:'
							value={cpf}
							onChange={(e) => setCpf(e.target.value)}
							inputContentType='text'
							testId='inputCPF'
							format={'###.###.###-##'}
							isNumber
						/>
					</section>
					<section className='containerRegister__formsContainer-input'>
						<InputBasic
							label='CEP:'
							value={cep}
							onChange={(e) => setCep(e.target.value)}
							testId='inputCEP'
							inputContentType='text'
							format={'#####-###'}
							isNumber
						/>
					</section>
					<section className='containerRegister__formsContainer-input'>
						<InputBasic
							label='ENDEREÇO:'
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							testId='inputAddress'
						/>
					</section>
				</section>
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

export default RegisterAddress;
