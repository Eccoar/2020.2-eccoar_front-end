import logo from '../assets/Eccoar.png';
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';

const FirstPage = () => {
	const history = useHistory();
	return (
		<section className='containerFirstPage'>
			<section className='containerFirstPage__componentsContainer'>
				<img src={logo} alt='' />
			</section>
			<section className='containerFirstPage__buttonsContainer'>
				<section className='containerFirstPage__buttonsContainer-buttonSize'>
					<Button text='LOGIN' pattern='secondary' />
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
