import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import InputBasic from '../../components/inputBasic';

const SubmitComplaintInfos = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');

	const history = useHistory();
	const onSubmit = () => {
		history.push('/submit-complaint/photo', {
			name,
			description,
			category,
		});
	};
	return (
		<div className='submitComplaintInfos'>
			<p>
				Precisamos saber algumas informações sobre a sua denúncia antes
				de adiciona-las ao sistema
			</p>
			<div className='submitComplaintInfos__content'>
				<InputBasic
					label='Título'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<InputBasic
					inputType='textarea'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					label='Descrição'
				/>
				<InputBasic
					label='Categoria'
					inputType='dropdown'
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					dropdownItems={['Buraco', 'Água', 'Energia']}
				/>
			</div>
			<Button text='Continuar' onClick={onSubmit} />
		</div>
	);
};

export default SubmitComplaintInfos;
