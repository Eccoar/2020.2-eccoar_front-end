import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/Eccoar.png';
import InputBasic from '../../components/inputBasic';
import Button from '../../components/Button';
import arrow from '../../assets/arrow.svg';

const RegisterAdress = () => {
	const [cpf, setCpf] = useState('');
	const [cep, setCep] = useState('');
	const [adress, setAdress] = useState('');
	const history = useHistory();
	const { name, lastName } = history.location.state as {
		name: string;
		lastName: string;
	};

	const push = () => {
		history.push('/register/email', {
			cpf,
			cep,
			adress,
			name,
			lastName,
		});
		console.log(name, lastName);
	};
	return (
		<section className='containerRegister'>
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
						/>
					</section>
					<section className='containerRegister__formsContainer-input'>
						<InputBasic
							label='CEP:'
							value={cep}
							onChange={(e) => setCep(e.target.value)}
						/>
					</section>
					<section className='containerRegister__formsContainer-input'>
						<InputBasic
							label='ENDEREÇO:'
							value={adress}
							onChange={(e) => setAdress(e.target.value)}
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

export default RegisterAdress;
