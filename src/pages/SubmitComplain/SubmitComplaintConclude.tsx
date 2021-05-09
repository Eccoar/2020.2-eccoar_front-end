import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

interface IHistory {
	success: boolean;
}

const SubmitComplaintConclude = () => {
	const history = useHistory<IHistory>();

	const renderSuccess = () => (
		<>
			<p>SUA DENÚNCIA FOI ADICIONADA O NOSSO SISTEMA!!</p>
			<IoCheckmarkDoneOutline />
			<Button text='Finalizar' onClick={() => history.push('/home')} />
		</>
	);

	const renderFail = () => (
		<>
			<p>ERRO AO ADICIONAR A SUA DENÚNCIA AO SISTEMA!!</p>
			<IoCheckmarkDoneOutline />
			<Button text='Finalizar' onClick={() => history.push('/home')} />
		</>
	);

	return (
		<div className='submitComplaint' data-testid='SubmitComplaintConclude'>
			{history.location.state.success ? renderSuccess() : renderFail()}
		</div>
	);
};

export default SubmitComplaintConclude;
