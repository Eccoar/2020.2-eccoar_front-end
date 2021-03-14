import { FC } from 'react';
import '../styles/inputBasic.scss';

type InputBasicProps = {
	/** Definir Label do input */
	label?: string;
	/** Definir input ou textarea */
	inputType?: 'input' | 'textarea' | 'dropdown';
	/** Indicar valores referentes ao dropdwon */
	value?: Array<string>;
};

const InputBasic: FC<InputBasicProps> = ({ label, inputType, value = [] }) => {
	return (
		<>
			<div className='input-container'>
				<h1 className='input-label'>{label}</h1>
				{inputType == 'textarea' ? (
					<textarea className='input-camp input-camp__textarea' />
				) : inputType == 'dropdown' ? (
					<select className='input-camp'>
						{value.map((item) => {
							return (
								<option className='option' value={item}>
									{item}
								</option>
							);
						})}
						;
					</select>
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
