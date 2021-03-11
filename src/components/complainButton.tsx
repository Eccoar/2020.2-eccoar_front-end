import { FC } from 'react';
import { ReactComponent as MegaPhone } from '../assets/MegaPhone.svg';
import { ReactComponent as Next } from '../assets/Next.svg';
import { ReactComponent as Echo } from '../assets/Echo.svg';
import '../styles/complainButton.scss';

type ComplainButtonProps = {
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

const ComplainButton: FC<ComplainButtonProps> = ({
	text,
	pattern,
	icon,
	fill,
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
					<Next className='icon icon__next' />
				) : icon == 'megaphone' ? (
					<MegaPhone className='icon icon__megaphone' />
				) : icon == 'echo' ? (
					<Echo className='icon icon__echo' />
				) : null}
			</button>
		</div>
	);
};

export default ComplainButton;
