import { FC } from 'react';
import { ReactComponent as MegaPhone } from '../assets/MegaPhone.svg';
import { ReactComponent as Next } from '../assets/Next.svg';
import { ReactComponent as Echo } from '../assets/Echo.svg';
import '../styles/complainButton.scss';

type ButtonProps = {
	/** Texto apresentado no botão */
	text: string;
	/** Escolher pattern do Botão Primary para vermelho, Secondary para Azul */
	pattern?: 'primary' | 'secondary';
	/** Selecionar icone entre Next, MegaPhone, Echo */
	icon?: 'next' | 'megaphone' | 'echo';
	/** Definir botão como preechido ou botão de bordas */
	fill?: boolean;
	/** Função ao clicar no botão */
	onClick?: VoidFunction;
};

const Button: FC<ButtonProps> = ({
	text,
	pattern = 'primary',
	icon,
	fill = true,
	onClick,
}) => {
	const className = `complain-button complain-button${
		pattern == 'primary' ? '__primary' : '__secondary'
	}${fill == false ? '__border' : ''}`;

	return (
		<div>
			<button type='button' onClick={onClick} className={className}>
				{text}
				{icon == 'next' ? (
					<Next data-testid='next-icon' className='icon icon__next' />
				) : icon == 'megaphone' ? (
					<MegaPhone
						data-testid='megaphone-icon'
						className='icon icon__megaphone'
					/>
				) : icon == 'echo' ? (
					<Echo data-testid='echo-icon' className='icon icon__echo' />
				) : null}
			</button>
		</div>
	);
};

export default Button;
