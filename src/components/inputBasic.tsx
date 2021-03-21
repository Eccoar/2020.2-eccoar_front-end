import React, { FC } from 'react';

type InputBasicProps = {
	/** Definir Label do input */
	label?: string;
	/** Definir input ou textarea */
	inputType?: 'input' | 'textarea' | 'dropdown';
	/** Indicar valores referentes ao dropdwon */
	dropdownItems?: Array<string>;
	/** Indica a função passada para capturar o valor do input */
	onChange(
		e:
			| React.ChangeEvent<HTMLTextAreaElement>
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLInputElement>,
	): void;
	/** Valor recebido do input */
	value: string;
};

const InputBasic: FC<InputBasicProps> = ({
	label,
	inputType,
	dropdownItems = [],
	value,
	onChange,
}) => {
	return (
		<div className='input-container'>
			<h1 className='input-container__label'>{label}</h1>
			{inputType == 'textarea' ? (
				<textarea
					onChange={onChange}
					value={value}
					className='input-container__input input-container__input--textarea'
				/>
			) : inputType == 'dropdown' ? (
				<select
					onChange={onChange}
					value={value}
					className='input-container__input input-container__input--select'
				>
					<option value=''></option>
					{dropdownItems.map((item) => {
						return (
							<option
								key={item}
								className='input-container__option'
								value={item}
							>
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
					className='input-container__input'
					onChange={onChange}
					value={value}
				/>
			)}
		</div>
	);
};

export default InputBasic;
