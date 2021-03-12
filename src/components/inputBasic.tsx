import { FC } from 'react';
import '../styles/inputBasic.scss';

type InputBasicProps = {
	/** Definir Label do input */
	label?: string;
	/** Definir input ou textarea */
	inputType?: 'input' | 'textarea';
};

const InputBasic: FC<InputBasicProps> = ({ label, inputType }) => {
	return (
		<>
			<div className='input-container'>
				<h1 className='input-label'>{label}</h1>
				{inputType == 'textarea' ? (
					<textarea className='input-camp input-camp__textarea' />
				) : (
					<input
						type='text'
						name={label}
						placeholder={label}
						className='input-camp'
					/>
				)}
			</div>
		</>
	);
};

export default InputBasic;
