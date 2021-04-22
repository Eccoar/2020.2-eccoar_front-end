import React, { FC } from 'react';

type InputBasicProps = {
	/** Definir Label do input */
	label?: string;
	/** Definir input ou textarea */
	inputType?: 'input' | 'textarea' | 'dropdown';
	// Indica o type do input
	inputContentType?: string;
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
	testId?: string;
};

const InputBasic: FC<InputBasicProps> = ({
	label,
	inputType,
	dropdownItems = [],
	value,
	onChange,
	inputContentType,
	testId,
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
			) : inputContentType === null ? (
				<input
					type='text'
					name={label}
					className='input-container__input'
					onChange={onChange}
					value={value}
					data-testid={testId}
				/>
			) : (
				<input
					type={inputContentType}
					name={label}
					className='input-container__input'
					onChange={onChange}
					value={value}
					data-testid={testId}
				/>
			)}
		</div>
	);
};

export default InputBasic;
