import { Link } from 'react-router-dom';
import Button from '../components/Button';

import '../styles/homePage.scss';

const Home = () => {
	return (
		<div className='home'>
			<Link to='/submit-complaint/infos'>
				<Button text='Criar denúncia' />
			</Link>
		</div>
	);
};

export default Home;
