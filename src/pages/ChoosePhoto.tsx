import { FiCamera } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/picturePage.scss';

const ChoosePhoto = () => {
	const history = useHistory();
	const onSubmit = () => {
		history.push('/submit-complaint/photo', history.location.state);
	};

	return (
		<div className='takePhoto'>
			<div />
			<FiCamera />
			<Link to='/submit-complaint/location'>
				<Button text='Continuar' />
			</Link>
		</div>
	);
};

export default ChoosePhoto;
