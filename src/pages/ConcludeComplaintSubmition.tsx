import { useEffect } from 'react';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { Link, useHistory } from 'react-router-dom';
import Button from '../components/Button';

import '../styles/submitComplaint.scss';

interface IHistory {
	success: boolean;
}

const ConcludeComplaintSubmition = () => {
	const history = useHistory<IHistory>();
	useEffect(() => {
		history.location.state.success;
	}, []);

	const renderSuccess = () => (
		<>
			<p>SUA DENÚNCIA FOI ADICIONADA O NOSSO SISTEMA!!</p>
			<IoCheckmarkDoneOutline />
			<Link to='/'>
				<Button text='Finalizar' />
			</Link>
		</>
	);

	const renderFail = () => (
		<>
			<p>ERRO AO ADICIONAR A SUA DENÚNCIA AO SISTEMA!!</p>
			<IoCheckmarkDoneOutline />
			<Link to='/'>
				<Button text='Finalizar' />
			</Link>
		</>
	);

	return (
		<div className='submitComplaint'>
			{history.location.state.success ? renderSuccess() : renderFail()}
		</div>
	);
};

export default ConcludeComplaintSubmition;
