import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/Eccoar.png';
import InputBasic from '../../components/inputBasic';
import Button from '../../components/Button';

const RegisterName = () => {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');

	const history = useHistory();

	const push = () => {
		history.push('/register/adress', {
			name,
			lastName,
		});
		console.log(name, lastName);
	};

	return (
		<section className='containerRegister'>
			<section className='containerRegister__componentsContainer'>
				<img src={logo} alt='' />
			</section>
			<section className='containerRegister__formsContainer'>
				<section className='containerRegister__formsContainer-input'>
					<InputBasic
						label='SEU NOME:'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</section>
				<section className='containerRegister__formsContainer-input'>
					<InputBasic
						label='E SOBRENOME:'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
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

export default RegisterName;
