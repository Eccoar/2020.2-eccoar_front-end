import { FC } from 'react';
import { ReactComponent as MegaPhone } from '../assets/MegaPhone.svg';
import { ReactComponent as Next } from '../assets/Next.svg';
import { ReactComponent as Echo } from '../assets/Echo.svg';
import { ReactComponent as Check } from '../assets/Check.svg';

type ButtonProps = {
	/** Texto apresentado no botão */
	text: string;
	/** Escolher pattern do Botão Primary para vermelho, Secondary para Azul */
	pattern?: 'primary' | 'secondary';
	/** Selecionar icone entre Next, MegaPhone, Echo, Check */
	icon?: 'next' | 'megaphone' | 'echo' | 'check';
	/** Definir botão como preechido ou botão de bordas */
	fill?: boolean;
	/** Função ao clicar no botão */
	onClick?: VoidFunction;
	/** Varíavel que define se o botão aumenta */
	bigger?: boolean;
	/** Define a id do voto */
	vote_id?: number;
	/** Define o status da denúncia, que pode ser 'open', 'wait' ou 'finished' */
	status?: string;
};

const Button: FC<ButtonProps> = ({
	text,
	pattern = 'primary',
	icon,
	fill = true,
	onClick,
	bigger = false,
}) => {
	const className = `
		complain-button
		${
			pattern == 'primary'
				? 'complain-button--primary'
				: 'complain-button--secondary'
		}
		${
			!fill
				? pattern == 'primary'
					? 'complain-button--border-primary'
					: 'complain-button--border-secondary'
				: ''
		}
		${bigger ? 'complain-button--bigger' : ''}
	`;

	return (
		<button
			type='button'
			onClick={onClick}
			className={className}
			data-testid='button'
		>
			{text}
			{icon == 'next' ? (
				<Next
					data-testid='next-icon'
					className='complain-button__icon complain-button__icon--next'
				/>
			) : icon == 'megaphone' ? (
				<MegaPhone
					data-testid='megaphone-icon'
					className='complain-button__icon complain-button__icon--megaphone'
				/>
			) : icon == 'echo' ? (
				<Echo
					data-testid='echo-icon'
					className='complain-button__icon complain-button__icon--echo'
				/>
			) : icon == 'check' ? (
				<Check
					data-testid='check-icon'
					className='complain-button__icon complain-button__icon--check'
				/>
			) : null}
		</button>
	);
};

export default Button;
