import logo from '../assets/Eccoar.png';
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/auth';

const FirstPage = () => {
	const history = useHistory();

	const { userId } = useAuth();
	useEffect(() => {
		if (userId) {
			history.replace('/home');
		}
	}, []);

	return (
		<section className='containerFirstPage'>
			<section className='containerFirstPage__componentsContainer'>
				<img src={logo} alt='' />
			</section>
			<section className='containerFirstPage__buttonsContainer'>
				<section className='containerFirstPage__buttonsContainer-buttonSize'>
					<Button
						text='LOGIN'
						onClick={() => history.push('/login')}
						pattern='secondary'
					/>
				</section>
				<section className='containerFirstPage__buttonsContainer-buttonSize'>
					<Button
						text='CADASTRO'
						onClick={() => history.push('/register/name')}
						pattern='secondary'
					/>
				</section>
			</section>
		</section>
	);
};

export default FirstPage;
